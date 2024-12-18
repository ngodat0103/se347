export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const headers = {
  "Content-Type": "application/json",
};
export function handleResponse(response: any) {
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export function handleError(error: any) {
  console.error("API call failed. " + error);
  throw error;
}
