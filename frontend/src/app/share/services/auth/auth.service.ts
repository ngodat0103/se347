import { TokenStorageService } from './../token-storage/token-storage.service';
import { AccountModel } from './../../models/account.model';
import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { ApiService } from "../_core/api.service";
import { Observable } from "rxjs";
import { TokenModel } from "../../models/token.model";
import { apiPath } from "../../constance/api-path";
import { environment } from "../../../../environments/environment.prod";
import { HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";

const apiUrl = environment.apiUrl;
const path = apiPath.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService,
              private tokenStorageService: TokenStorageService) { }

  login(account: AccountModel): Observable<TokenModel> {
    const url = `${apiUrl}/${path.login}`;
    return this.apiService.postNoHeader(url, account)
      .pipe(
        map((httpResponse: HttpResponse<any>) => {
          const body = httpResponse.body;
          return body;
        })
      );
  }

  register(userModel: UserModel): Observable<UserModel> {
    const url = `${apiUrl}/${path.register}`;
    return this.apiService.postNoHeader(url, userModel)
      .pipe(
        map((httpResponse: HttpResponse<any>) => {
          const body = httpResponse.body;
          return body;
        })
      );
  }

  checkLogin(): boolean {
    return this.tokenStorageService.getToken() ? true : false;
  }
}
