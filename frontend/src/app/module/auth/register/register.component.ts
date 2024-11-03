import { Router } from '@angular/router';
import { AuthService } from './../../../share/services/auth/auth.service';
import { AccountModel } from './../../../share/models/account.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/share/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister = this.initFormRegister();
  constructor(private authServive: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  initFormRegister(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  register(event: any) {
    this.formRegister
    const account = new AccountModel();
    account.username = this.formRegister.getRawValue().username;
    account.password = this.formRegister.getRawValue().password;
    const user = new UserModel();
    user.fullname = this.formRegister.getRawValue().fullname;
    user.email = this.formRegister.getRawValue().email;
    user.phone = this.formRegister.getRawValue().phone;
    user.account = account;
    this.authServive.register(user).subscribe((data: any) => {
      this.formRegister.reset();
      this.router.navigate(['/auth/login']);
    });
  }
}
