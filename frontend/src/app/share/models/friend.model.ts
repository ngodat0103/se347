export class FriendModel {
    _id!: string;
    avatarUrl!: string;
    account!: AccountFriendRequest;
    createAt!: Date;
    updatedAt!: Date;
    fromUser!: UserFriendRequest;
}

export class FriendRequestCreateDto {
    toUserId!: string;
}

export class FriendApproveDto {
    friendRequestId!: string;
}

export class AccountFriendRequest {
    username!: string;
}

export class UserFriendRequest {
    _id!: string;
    avatarUrl!: string;
    account!: AccountFriendRequest;
}

