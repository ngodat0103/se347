import { AccountModel }  from './account.model';

export class UserModel {
    _id!: string;
    userId!: string;
    fullname!: string;
    address!: string;
    email!: string;
    avatarUrl!: string;
    phone!: string;
    about!: string;
    yearOfBirth!: number;
    updatedAt!: Date;
    createdAt!: Date;
    account!: AccountModel;
    friendRequestStatus!: string;
}
