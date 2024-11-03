import { ReactiveFormsModule } from '@angular/forms';
import { ContentChatComponent } from './content-chat/content-chat.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddMemberModalComponent } from './modal/add-member-modal/add-member-modal.component';
import { AvatarImageGroupComponent } from './avatar-image-group/avatar-image-group.component';
import { OptionChatComponent } from './option-chat/option-chat.component';
import { ProfileModalComponent } from './modal/profile-modal/profile-modal.component';
import { ListRequestComponent } from './modal/list-request/list-request.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    SidebarComponent,
    ContentChatComponent,
    AddMemberModalComponent,
    AvatarImageGroupComponent,
    OptionChatComponent,
    ProfileModalComponent,
    ListRequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PickerModule
  ],
  exports: [
    SidebarComponent,
    ContentChatComponent,
    AvatarImageGroupComponent
  ]
})
export class UiModule { }
