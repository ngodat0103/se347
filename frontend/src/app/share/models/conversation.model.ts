import { UserModel } from './user.model';
export class ConversationModel {
    id!: string;
    _id!: string;
    conversationName!: string;
    users!: UserModel[];
    lastMessage!: string;
    readStatus!: Object[];
    createdAt!: Date;
    updatedAt!: Date;
}

export class ConversationCreateModel {
    conversationName!: string;
    arrayUserId!: String[];
}
