import { UserModel } from 'src/app/share/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage/token-storage.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { ProfileModalComponent } from '../modal/profile-modal/profile-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  me!: UserModel;
  status = '';
  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.me = this.tokenStorageService.getUser();
    if (this.router.url.includes('chat')){
      this.status = 'chat';
    } else if (this.router.url.includes('list-user')) {
      this.status = 'users';
    }
  }
  signout($event: any): void {
    this.tokenStorageService.signOut();
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/auth/login']);
    }
  }
  openModalProfile(event: any): void {
    const modalRef = this.modalService.open(ProfileModalComponent, {
      size: 'md'
    })
    modalRef.componentInstance.action = 'my-profile';
    modalRef.componentInstance.user = this.me;
    modalRef.result.then((result) => {
    })
  }
  onSelect(type: string) : void {
    this.status = type;
  }
}
