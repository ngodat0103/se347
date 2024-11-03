import { UserService } from './../../share/services/user/user.service';
import { UserState } from './../../share/state/user.state';
import { UserModel } from 'src/app/share/models/user.model';
import { TokenStorageService } from './../../share/services/token-storage/token-storage.service';
import { ConversationModel } from './../../share/models/conversation.model';
import { ConversationService } from './../../share/services/conversation/conversation.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SocketIoService } from 'src/app/share/services/socketio/socket-io.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  listConversations: ConversationModel[] = [];
  currentUser: any;
  listFriend: UserModel[] = [];

  constructor(private conversationService: ConversationService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private socketIoService: SocketIoService,) { }

  ngOnInit(): void {
    this.listenService();
    this.socketIoService.getConversation().pipe().subscribe((conversation: any) => {
      if (conversation) {
        this.listenService();
      }
    }); 
  }

  listenService() {
    let listUser: UserModel[] = [];
    this.currentUser = this.tokenStorageService.getUser();
    this.conversationService.getALLConversations().subscribe(conversation => {
      this.listConversations = conversation;
      this.listConversations.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
    });
    this.userService.getAllUser().subscribe(users => {
      this.listFriend = users;
    });
  }
  createConversation(event: any): void {
    this.conversationService.createConversation(event).subscribe((conversation: ConversationModel) => {
      this.listenService()
    })
  }
}
