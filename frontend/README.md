# Architecture

## App Module
```mermaid
graph BT;
    A[App Module] -->|contains| B[AppComponent]
    A -->|contains| C[AppRoutingModule]
```

## Auth Module
```mermaid
graph BT;
    D[Auth Module] -->|contains| E[AuthComponent]
    E -->|contains| F[LoginComponent]
    E -->|contains| G[RegisterComponent]
    D -->|contains| H[AuthService]
    H -->|API Calls| I[api/auth/login]
    H -->|API Calls| J[api/auth/register]
    H -->|API Calls| K[api/auth/refreshToken]
    H -->|API Calls| L[api/auth/changePassword]
    D -->|contains| M[AuthGuard]
```

## Chat Module
```mermaid
graph BT;
    N[Chat Module] -->|contains| O[ChatComponent]
    N -->|contains| P[SidebarChatComponent]
    N -->|contains| Q[ChatService]
    Q -->|API Calls| R[api/conversations]
    Q -->|API Calls| S[api/messages/conversation]
```

## Home Chat Module
```mermaid
graph BT;
    T[Home Chat Module] -->|contains| U[HomeChatComponent]
    T -->|contains| V[HomeChatRoutingModule]
```

## List User Module
```mermaid
graph BT;
    W[List User Module] -->|contains| X[ListUserComponent]
    W -->|contains| Y[SidebarListUserComponent]
    W -->|contains| Z[SuggestionUserComponent]
    W -->|contains| AA[UserService]
    AA -->|API Calls| AB[api/users]
    AA -->|API Calls| AC[api/users/me]
```

## Shared Module
```mermaid
graph BT;
    AD[Shared Module] -->|contains| AE[AuthService]
    AD -->|contains| AF[UserService]
    AD -->|contains| AG[ConversationService]
    AD -->|contains| AH[FriendService]
    AD -->|contains| AI[SocketIOService]
```

## API Service
```mermaid
graph BT;
    AJ[API Service] -->|API Calls| AK[api/auth/login]
    AJ -->|API Calls| AL[api/auth/register]
    AJ -->|API Calls| AM[api/auth/refreshToken]
    AJ -->|API Calls| AN[api/auth/changePassword]
    AJ -->|API Calls| AO[api/conversations]
    AJ -->|API Calls| AP[api/messages/conversation]
    AJ -->|API Calls| AQ[api/users]
    AJ -->|API Calls| AR[api/users/me]
    AJ -->|API Calls| AS[api/friends]
    AJ -->|API Calls| AT[api/friends/request]
```

## Models
```mermaid
graph BT;
    AU[Models] -->|contains| AV[UserModel]
    AU -->|contains| AW[ConversationModel]
    AU -->|contains| AX[MessageModel]
```
# Getting Started
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
