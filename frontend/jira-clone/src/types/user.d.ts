export interface LoginForm {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: {
        tokenValue: string
        issuedAt: string
        expiresAt: string
        tokenType: {
            value: string
        }
        scopes: string[]
    }
    refreshToken: null | {
        tokenValue: string
        issuedAt: string
        expiresAt: string
    }
    additionalParameters: any
}

export interface RegisterForm {
    userName: string;
    password: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
}