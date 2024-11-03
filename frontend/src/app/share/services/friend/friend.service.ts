import { ApiService } from './../_core/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { apiPath } from '../../constance/api-path';
import { map, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

const apiUrl = environment.apiUrl;
const path = apiPath.friend;
@Injectable({
  providedIn: 'root'
})
export class FriendService {
  
  constructor(private apiSerivce: ApiService) { }

  sendRequestFriend(toUserId: string): Observable<any> {
    const data = {
      toUserId
    }
    const url = `${apiUrl}/${path.request}`;
    return this.apiSerivce.post(url, data).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  getAllRequestFriend(): Observable<any> {
    const url = `${apiUrl}/${path.request}`;
    return this.apiSerivce.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      }
      )
    );
  }

  approveRequestFriend(fromUserId: string): Observable<any> {
    const data = {
      fromUserId
    }
    const url = `${apiUrl}/${path.approve}`;
    return this.apiSerivce.post(url, data).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  rejectRequestFriend(friendRequestId: string): Observable<any> {
    const url = `${apiUrl}/${path.reject}`;
    return this.apiSerivce.put(url, friendRequestId).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  getAllFriends(): Observable<any> {
    const url = `${apiUrl}/${path.friends}`;
    return this.apiSerivce.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }
}
