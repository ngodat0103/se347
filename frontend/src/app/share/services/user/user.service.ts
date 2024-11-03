import { UserModel } from 'src/app/share/models/user.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService } from './../_core/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { apiPath } from '../../constance/api-path';
import { HttpResponse } from '@angular/common/http';

const apiUrl = environment.apiUrl;
const path = apiPath.user;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  public $user = this.userSubject.asObservable();
  
  constructor(private apiService: ApiService) { }

  public getAllUser(): Observable<UserModel[]>{
    const pathUrl = `${apiUrl}/${path.user}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  public getMe(): Observable<UserModel>{
    const pathUrl = `${apiUrl}/${path.me}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }
}
