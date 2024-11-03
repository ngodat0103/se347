import { ContentChatComponent } from './../../share/ui/content-chat/content-chat.component';
import { SuggestionUserComponent } from './suggestion-user/suggestion-user.component';
import { ListUserComponent } from './list-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListUserComponent,
    children: [
      {
        path: '',
        redirectTo: 'suggest',
        pathMatch: 'full'
      },
      {
        path: 'suggest',
        component: SuggestionUserComponent
      },
      {
        path: 'chat',
        component: ContentChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUserRoutingModule { }
