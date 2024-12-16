export interface LoginForm {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
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
    additionalParameters: unknown
}

export interface RegisterForm {
    nickName: string;
    password: string;
    email: string;
}