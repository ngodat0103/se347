import { ConversationModel, ConversationCreateModel } from './../../models/conversation.model';
import { map, Observable } from 'rxjs';
import { ApiService } from './../_core/api.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { apiPath } from '../../constance/api-path';
import { HttpResponse } from '@angular/common/http';

const apiUrl = environment.apiUrl;
const path = apiPath.conversation;

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private apiService: ApiService) { }

  public getALLConversations(): Observable<ConversationModel[]> {
    const url = `${apiUrl}/${path.conversation}`;
    return this.apiService.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body.data;
        return body;
      })
    );;
  }

  public createConversation(conversation: ConversationCreateModel): Observable<ConversationModel> {
    const url = `${apiUrl}/${path.conversation}`;
    return this.apiService.post(url, conversation).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  public getConversationById(id: string): Observable<ConversationModel> {
    const url = `${apiUrl}/${path.conversation}/${id}`;
    return this.apiService.get(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  public addMemberToConversation(id: string, arrayUserId: string[]): Observable<ConversationModel> {
    const data = {
      arrayUserId: arrayUserId
    }
    const url = `${apiUrl}/${path.conversation}/${id}/add-user`;
    return this.apiService.put(url, data).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  public updateConversationName(conversationName: string, conversationId: string): Observable<any> {
    const url = `${apiUrl}/${path.conversation}/${conversationId}`;
    return this.apiService.put(url, conversationName).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  public markRead(conversationId: string): Observable<any> {
    const url = `${apiUrl}/${path.conversation}/${conversationId}/mark-read`;
    return this.apiService.put(url, conversationId).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  public removeMenberFromConversation(conversationId: string, userId: string): Observable<any> {
    const url = `${apiUrl}/${path.conversation}/${conversationId}/users/${userId}/remove-user`;
    return this.apiService.put(url).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }
}
