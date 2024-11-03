import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/share/models/user.model';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {
  @Input() user!: UserModel;
  isDisabled: boolean = true;
  profileForm: any;
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log('user', this.user);
    this.profileForm = this.initForm();
  }

  updateProfile(event: any): void {
    this.modal.close(this.profileForm.value);
  }
  initForm(): FormGroup {
    return new FormGroup({
      username: new FormControl(this.user?.account?.username, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user?.phone, [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }
}
