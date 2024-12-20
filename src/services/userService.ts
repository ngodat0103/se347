import { ErrorMessage } from "@/types/error";
import { LoginForm, LoginResponse, RegisterForm } from "@/types/user";
import Cookies from "js-cookie";
import { BASE_API_URL, headers } from "./baseApi";
export async function login(login_form: LoginForm): Promise<LoginResponse> {
  console.debug(login_form);

  console.info("Sending login request");
  const response = await fetch(`${BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(login_form),
  });

  if (response.ok) {
    const data: LoginResponse = await response.json();
    console.debug(data);

    return data;
  } else {
    // Handle unknown error
    const data = await response.json();
    console.debug(data);
    throw new Error("Unknown error. Check console for more information");
  }
}

export async function register(register_form: RegisterForm): Promise<void> {
  console.debug(register_form);

  const register_json = JSON.stringify(register_form);

  console.info("Sending register request");

  const response = await fetch(`${BASE_API_URL}/users`, {
    method: "POST",
    headers: headers,
    body: register_json,
  });

  if (response.ok) {
    const data = await response.json();
    console.debug(data);
  } else if (response.status === 409) {
    // Handle conflict error (username or email already exist)
    const data: ErrorMessage = await response.json();
    console.debug(data);

    throw new Error(data.detail);
  } else {
    // Handle other error
    const data = await response.json();
    console.debug(data);

    throw new Error("Unknown error. Check console for more information");
  }
}
export async function logout(): Promise<void> {
  console.info("Sending logout request");
  const accessToken = Cookies.get("accessToken");

  const response = await fetch(`${BASE_API_URL}/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    console.info("Logout successful");
  } else {
    const data: ErrorMessage = await response.json();
    console.debug(data);

    throw new Error(data.detail);
  }
}
