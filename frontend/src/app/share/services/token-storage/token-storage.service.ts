import { Injectable } from '@angular/core';
import {apiPath} from "../../constance/api-path";
import {LocalStorageService} from 'ngx-webstorage';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../../environments/environment.prod';
import { toInteger } from 'lodash';


const key = apiPath.cookie;
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService{

  constructor(private cookieService: CookieService) { }

  public saveToken(token: string): void {
    const future = toInteger(Date.now()) + 5 * 60000;
    this.cookieService.set(key.ID_KEY, token,{ 
      expires: future, 
      path: '/', 
      sameSite: 'Strict' 
   });
  }
  public getToken(): any {
    return this.cookieService.get(key.ID_KEY);
  }
  public addUser(user: any): void{
    const future = toInteger(Date.now()) + 5 * 60000;
    this.cookieService.set(key.USER, JSON.stringify(user), { 
      expires: future, 
      path: '/', 
      sameSite: 'Strict' 
   });
  }
  public getUser(): any{
    return this.cookieService.get(key.USER) ? JSON.parse(this.cookieService.get(key.USER)) : '';
  }
  public signOut(): void {
    this.cookieService.delete(key.ID_KEY, '/' );
    this.cookieService.delete(key.USER, '/' );
  }
}
