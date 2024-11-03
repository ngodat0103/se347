import { UserState } from './../../share/state/user.state';
import { UiModule } from 'src/app/share/ui/ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';
import { SidebarListUserComponent } from './sidebar-list-user/sidebar-list-user.component';
import { SuggestionUserComponent } from './suggestion-user/suggestion-user.component';


@NgModule({
  declarations: [
    ListUserComponent,
    SidebarListUserComponent,
    SuggestionUserComponent
  ],
  imports: [
    CommonModule,
    ListUserRoutingModule,
    UiModule
  ]
})
export class ListUserModule { }
