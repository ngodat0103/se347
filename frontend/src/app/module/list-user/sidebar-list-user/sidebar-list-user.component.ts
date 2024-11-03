import { SocketIoService } from './../../../share/services/socketio/socket-io.service';
import { TokenStorageService } from './../../../share/services/token-storage/token-storage.service';
import { FriendService } from './../../../share/services/friend/friend.service';
import { ListRequestComponent } from './../../../share/ui/modal/list-request/list-request.component';
import { Router } from '@angular/router';
import { UserState } from './../../../share/state/user.state';
import { UserModel } from 'src/app/share/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListUserComponent } from '../list-user.component';

@Component({
  selector: 'app-sidebar-list-user',
  templateUrl: './sidebar-list-user.component.html',
  styleUrls: ['./sidebar-list-user.component.scss']
})
export class SidebarListUserComponent implements OnInit {
  @Input() listFriends: any[] = [];
  @Input() listRequestFriends: any[] = [];
  constructor(private userState: UserState,
              private router: Router,
              private modalService: NgbModal,
              private friendService: FriendService,
              private socketIoService: SocketIoService) { }

  ngOnInit(): void {
    this.socketIoService.sendReqestFriend().subscribe((res: any) => {
      this.listRequestFriends.unshift(res);
    });
    this.socketIoService.acceptFriend().subscribe((res: any) => {
      this.listRequestFriends = this.listRequestFriends.filter((item: any) => item.fromUser._id !== res._id);
    });
  }
  selectFriend(user: UserModel): void{
    this.userState.setStateUser(user);
    this.router.navigate(['/home/chat']);
  }

  openModalRequest(event: any): void {
    const modalRef = this.modalService.open(ListRequestComponent, {
      size: 'md'
    });
    
    modalRef.componentInstance.listRequestFriends = this.listRequestFriends;
  }

  acceptRequest(user: any): void {
    this.friendService.approveRequestFriend(user.fromUser._id).subscribe((res: any) => {
    });
  }

  rejectRequest(user: any): void {
    console.log('reject', user);
  }
}
