import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { UserModel } from 'src/app/share/models/user.model';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-avatar-image-group',
  templateUrl: './avatar-image-group.component.html',
  styleUrls: ['./avatar-image-group.component.scss']
})
export class AvatarImageGroupComponent implements OnInit, OnChanges {
  @Input('listUser') listUser: UserModel[] | undefined;
  me: UserModel = this.tokenStorageService.getUser();
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.listUser && this.listUser?.length > 4 ? this.listUser = this.listUser?.slice(0, 4) : this.listUser;
  }

  ngOnInit(): void {

  }

}
