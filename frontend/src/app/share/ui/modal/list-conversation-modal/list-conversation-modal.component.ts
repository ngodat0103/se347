import { TokenStorageService } from './../../../services/token-storage/token-storage.service';
import { ConversationService } from './../../../services/conversation/conversation.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-conversation-modal',
  templateUrl: './list-conversation-modal.component.html',
  styleUrls: ['./list-conversation-modal.component.scss']
})
export class ListConversationModalComponent implements OnInit {
  listConversation: any = [];
  currentUser = this.tokenStorageService.getUser();
  listConversationSelect: any = [];
  constructor(private conversationService: ConversationService,
              private tokenStorageService: TokenStorageService,
              private modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.conversationService.getALLConversations().subscribe(conversations => {
      this.listConversation = conversations;
      console.log(this.listConversation);
    });
  }
  searchUser(event: any): void {

  }

  getValueCheckbox(event: any) {
    if (event.target.checked) {
      this.listConversationSelect.push(event.target.value);
    }
  }
  close(event: any): void {
    this.modal.close();
  }

  submit(event: any): void {
    this.modal.close(this.listConversationSelect);
  }

}
