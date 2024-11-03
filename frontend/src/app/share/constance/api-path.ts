export const apiPath = {
  cookie: {
    ID_KEY:'auth-token',
    USERNAME_KEY: 'username',
    Refresh_Token: 'refresh',
    CART: 'cart',
    USER: 'user'
  },
  auth: {
    login: 'api/auth/login',
    register: 'api/auth/register',
    refreshToken: 'api/auth/refreshToken',
    changePassword: 'api/auth/changePassword'
  },
  order: {
    order: 'api/orders',
  },
  conversation: {
    conversation: 'api/conversations'
  },
  user: {
    me: 'api/users/me',
    user: 'api/users',
  },
  message: {
    message: 'api/messages/conversation',
    tranfer: 'api/message/tranfer/conversation',
    recover: 'api/message/tranfer/recover'
  },
  friend: {
    request: 'api/friends/request',
    approve: 'api/friends/request/approve',
    reject: 'api/friends/request/reject',
    friends: 'api/friends'
  }
}
