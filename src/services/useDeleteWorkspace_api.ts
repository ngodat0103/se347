import { ErrorMessage } from "@/types/error";
import Cookies from "js-cookie";
import router from "next/router";

const token = Cookies.get("accessToken");

export async function deleteWorkspace(workspaceId: string): Promise<void> {
  console.debug(`Deleting workspace with ID: ${workspaceId}`);

  if (!token) {
    router.push("/sign-in");
    throw new Error("Unauthorized: No access token found.");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(errorResponse.detail || "Failed to delete workspace.");
  }

  console.debug(`Workspace with ID ${workspaceId} deleted successfully.`);
}
