// import { ErrorMessage } from "@/types/error";
// import { LoginForm, LoginResponse, RegisterForm } from "@/types/user";
// export async function login(login_form: LoginForm): Promise<LoginResponse> {
//     console.debug(login_form);

//     console.info("Sending login request");
//     let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(login_form),
//     });

//     if (response.ok) {
//         const data: LoginResponse = await response.json();
//         console.debug(data);

//         return data;

//     } else if (response.status === 401) {
//         // Handle unauthorized error
//         const data: ErrorMessage = await response.json();
//         console.debug(data);

//         throw new Error(data.detail);
//     } else {
//         // Handle unknown error
//         const data = await response.json();
//         console.debug(data);

//         throw new Error("Unknown error. Check console for more information");
//     }
// }

// export async function register(register_form: RegisterForm): Promise<void> {
//     console.debug(register_form);

//     const register_json = JSON.stringify(register_form);

//     console.info("Sending register request");

//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: register_json
//     });

//     if (response.ok) {
//         const data = await response.json();
//         console.debug(data);
//     } else if (response.status === 409) {
//         // Handle conflict error (username or email already exist)
//         const data: ErrorMessage = await response.json();
//         console.debug(data);

//         throw new Error(data.detail);
//     } else {
//         // Handle other error
//         const data = await response.json();
//         console.debug(data);

//         throw new Error("Unknown error. Check console for more information");
//     }
// }
import { ErrorMessage } from "@/types/error";
import { LoginForm, LoginResponse, RegisterForm } from "@/types/user";

export async function login(login_form: LoginForm): Promise<LoginResponse> {
    console.debug(login_form);

    console.info("Sending login request");
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_form),
    });

    if (response.ok) {
        const data: LoginResponse = await response.json();
        console.debug(data);

        return data;

    } else if (response.status === 401) {
        // Unauthorized error (wrong password or account)
        const data: ErrorMessage = await response.json();
        console.debug(data);

        throw new Error("Incorrect email or password. Please try again.");
    } else if (response.status === 404) {
        // Handle user not found error
        const data: ErrorMessage = await response.json();
        console.debug(data);

        throw new Error("Account not found. Please register first.");
    } else {
        // Handle unknown error
        const data = await response.json();
        console.debug(data);

        throw new Error("An unknown error occurred. Please try again later.");
    }
}

export async function register(register_form: RegisterForm): Promise<void> {
    console.debug(register_form);

    const register_json = JSON.stringify(register_form);

    console.info("Sending register request");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: register_json
    });

    if (response.ok) {
        const data = await response.json();
        console.debug(data);
    } else if (response.status === 409) {
        // Conflict error (email already exists)
        const data: ErrorMessage = await response.json();
        console.debug(data);

        throw new Error("This email is already in use. Please choose another email.");
    } else {
        // Handle other errors
        const data = await response.json();
        console.debug(data);

        throw new Error("An unknown error occurred. Please try again later.");
    }
}
