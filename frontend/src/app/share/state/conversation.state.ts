import { ConversationModel } from 'src/app/share/models/conversation.model';
import { ConversationService } from './../services/conversation/conversation.service';
import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationState implements OnDestroy {
    private listConversationSubject = new BehaviorSubject<ConversationModel[]>([]);
    public $conversations = this.listConversationSubject.asObservable();

    private conversationSubject = new BehaviorSubject<ConversationModel | null>(null);
    public $conversation = this.conversationSubject.asObservable();

    private addMemberStatusSubject = new BehaviorSubject<boolean>(false);
    public $isAddMember = this.addMemberStatusSubject.asObservable();

    subscription: Subscription = new Subscription();

    constructor() { }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public addMemberStatus(status: boolean): void {
        this.addMemberStatusSubject.next(status);
    }

    public setStateUser(conversationModel: ConversationModel[]): void {
        this.listConversationSubject.next(conversationModel);
    }

    public setConversation(conversationModel: ConversationModel): void {
        this.conversationSubject.next(conversationModel);
    }

    public getStateConversation(): ConversationModel | null{
        return this.conversationSubject.getValue();
    }

    public getStateUser(): ConversationModel[] {
        return this.listConversationSubject.getValue();
    }
}
