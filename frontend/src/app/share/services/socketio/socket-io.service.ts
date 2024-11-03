import { UserModel } from './../../models/user.model';
import { TokenStorageService } from './../token-storage/token-storage.service';
import { MessageModel } from './../../models/message.model';
import { ApiService } from './../_core/api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';
import { apiPath } from '../../constance/api-path';
import { HttpResponse } from '@angular/common/http';


const apiUrl = environment.apiUrl;
const path = apiPath.message;


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  socket!: Socket;
  public message$: BehaviorSubject<any> = new BehaviorSubject('');
  currentUser!: UserModel;

  constructor( private apiService: ApiService, 
              private tokenStorageService: TokenStorageService) { 
                this.currentUser = this.tokenStorageService.getUser();
                this.setupSocketConnection() 
              }

  setupSocketConnection() {
    this.socket = io(environment.apiUrl, {transports: ['websocket', 'polling', 'flashsocket'], query: {userId: this.currentUser._id}});
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public sendMessage(message: FormData, conversationId: string): Observable<MessageModel> {
    const pathUrl = `${apiUrl}/${path.message}/${conversationId}`;
    return this.apiService.postFormData(pathUrl, message).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  public getAllMessageByConversation(conversationId: string): Observable<MessageModel[]> {
    const pathUrl = `${apiUrl}/${path.message}/${conversationId}`;
    return this.apiService.get(pathUrl).pipe(
      map((httpResponse: HttpResponse<any>) => {
        const body = httpResponse.body;
        return body;
      })
    );
  }

  getMessages(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('new-message', (data: any) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  selectRoom(conversationId: string){
    this.socket.emit('join-room', conversationId);
  }
  leaveRoom(conversationId: string){
    this.socket.emit('leave-room', conversationId);
  }

  getConversation(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('update-conversation', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  sendReqestFriend(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('send-friend-request', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  acceptFriend(): Observable<any>{
    return new Observable<any>(observer => {
      this.socket.on('approved-friend', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  
}
