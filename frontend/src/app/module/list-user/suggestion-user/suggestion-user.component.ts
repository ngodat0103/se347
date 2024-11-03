import { FriendService } from './../../../share/services/friend/friend.service';
import { UserService } from './../../../share/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-user',
  templateUrl: './suggestion-user.component.html',
  styleUrls: ['./suggestion-user.component.scss']
})
export class SuggestionUserComponent implements OnInit {
  listUsers: any[] = [];
  constructor(private userService: UserService,
              private friendService: FriendService) { }

  ngOnInit(): void {
    this.listenSerivce();
  }

  listenSerivce(): void {
    this.userService.getAllUser().subscribe(users => {
      this.listUsers = users.filter(user => user?.friendRequestStatus === 'none');
    });
  }

  addFriend(user: any): void {
    this.friendService.sendRequestFriend(user._id).subscribe(res => {
      this.listenSerivce();
    });
  }
}
