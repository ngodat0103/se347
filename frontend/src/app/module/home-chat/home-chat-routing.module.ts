import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeChatComponent } from './home-chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeChatComponent,
    children: [
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'list-user',
        loadChildren: () => import('../list-user/list-user.module').then(m => m.ListUserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeChatRoutingModule { }
