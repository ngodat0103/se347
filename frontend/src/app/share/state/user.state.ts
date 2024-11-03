import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserState implements OnDestroy {
    private userSubject = new BehaviorSubject<UserModel | null>(null);
    public $user = this.userSubject.asObservable();

    subscription: Subscription = new Subscription();

    constructor() { }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public setStateUser(user: UserModel): void {
        this.userSubject.next(user);
    }

    public getStateUser(): UserModel | null {
        return this.userSubject.getValue();
    }
}
