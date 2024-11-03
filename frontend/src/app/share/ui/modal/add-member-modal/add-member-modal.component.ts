import { ConversationCreateModel } from './../../../models/conversation.model';
import { ConversationModel } from 'src/app/share/models/conversation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/share/models/user.model';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss']
})
export class AddMemberModalComponent implements OnInit, OnChanges {
  @Input() listFriend: UserModel[] = [];
  @Input() action!: string;
  @Input() conversation!: any;
  listUserIdSelected: string[] = [];
  formConversation = this.initForm();
  users!: any;
  constructor(private modal: NgbActiveModal) { }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.users = this.listFriend;
    if (this.action === 'add-member') {
      this.listFriend = this.listFriend.filter(user => !this.conversation.users.some((member: any) => member._id === user._id));
    }
  }

  initForm(): FormGroup {
    return new FormGroup({
      conversationName: new FormControl('', [Validators.required]),
    });
  }
  searchUser(event: any): void {
    this.listFriend = this.users.filter((user: any) => user.account?.username.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  getValueCheckbox(event: any) {
    if (event.target.checked) {
      this.listUserIdSelected.push(event.target.value);
    } else {
      this.listUserIdSelected = this.listUserIdSelected.filter(id => id !== event.target.value);
    }
  }

  onSubmit(event: any) {
    const conversation = new ConversationCreateModel()
    conversation.conversationName = this.formConversation.value.conversationName ? this.formConversation.value.conversationName : 'Group no name';
    conversation.arrayUserId = this.listUserIdSelected;
    this.modal.close(conversation);
  }
  close(event: any): void {
    this.modal.close();
  }
}
