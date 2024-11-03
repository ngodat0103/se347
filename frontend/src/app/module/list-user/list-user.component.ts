import { FriendService } from './../../share/services/friend/friend.service';
import { UserModel } from 'src/app/share/models/user.model';
import { UserService } from './../../share/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  listFriends: UserModel[] = [];
  listRequestFriends: any[] = [];
  constructor(private userService: UserService,
              private friendService: FriendService) { }

  ngOnInit(): void {
   this.listenService();
  }
  listenService(): void {
    this.friendService.getAllFriends().subscribe(users => {
      this.listFriends = users;
      console.log('listFriends', this.listFriends);
    });
    this.friendService.getAllRequestFriend().subscribe(reuquests => {
      this.listRequestFriends = reuquests;
    })
  }
}
