import { UserState } from './../../share/state/user.state';
import { UiModule } from 'src/app/share/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';


@NgModule({
  declarations: [
    ChatComponent,
    SidebarChatComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    UiModule
  ]
})
export class ChatModule { }
