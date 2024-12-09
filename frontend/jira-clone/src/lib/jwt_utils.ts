import { cookies } from 'next/headers'

export async function isTokenValid(token: string | undefined): Promise<boolean> {
    // If token is not provided then return false
    if (!token) {
        return false;
    }

    // Check with backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/isValidJwt`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    // If response code is 202 then token is valid
    return response.status === 202;
}

export async function isCurrentTokenValid(): Promise<boolean> {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value;
    if (!token) {
        return false;
    }

    return isTokenValid(token);
}
