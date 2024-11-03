import { UiModule } from 'src/app/share/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeChatRoutingModule } from './home-chat-routing.module';
import { HomeChatComponent } from './home-chat.component';


@NgModule({
  declarations: [
    HomeChatComponent,
  ],
  imports: [
    CommonModule,
    HomeChatRoutingModule,
    UiModule
  ]
})
export class HomeChatModule { }
