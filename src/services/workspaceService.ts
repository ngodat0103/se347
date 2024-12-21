import { CreateWorkspaceForm, WorkspaceResponse } from "@/types/workspace";
import { ErrorMessage } from "@/types/error";
import Cookies from "js-cookie";
import { resizeImage } from "@/lib/resizeImage";
import { updateWorkspaceForm } from "@/types/workspace";
import router from "next/router";
import { BASE_API_URL, headers } from "./baseApi";
const token = Cookies.get("accessToken");

export const fetchWorkspaces = async () => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) {
      throw new Error("Token không tồn tại trong cookie");
    }

    const response = await fetch(`${BASE_API_URL}/workspaces/me`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách workspace");
    }

    const data = await response.json();
    return data; // Trả về danh sách workspaces
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else if (typeof err === "string") {
      throw new Error(err);
    } else {
      throw new Error("Lỗi không xác định");
    }
  }
};

export const fetchWorkspaceDetails = async (workspaceId: string) => {
  try {
    const token = Cookies.get("accessToken");

    if (!token) {
      throw new Error("Token không tồn tại trong cookie");
    }
    const response = await fetch(`${BASE_API_URL}/workspaces/me`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách workspace");
    }

    const workspaces: WorkspaceResponse[] = await response.json();

    // Lọc workspace theo ID
    const workspace = workspaces.find((ws) => ws.id === workspaceId);

    if (!workspace) {
      throw new Error("Workspace không tồn tại");
    }

    return workspace; // Trả về thông tin workspace
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else if (typeof err === "string") {
      throw new Error(err);
    } else {
      throw new Error("Lỗi không xác định");
    }
  }
};

export async function createWorkspace(
  workspaceForm: CreateWorkspaceForm,
): Promise<WorkspaceResponse> {
  console.debug(workspaceForm);

  if (!token) {
    router.push("/login");
  }
  // 1. Gửi yêu cầu tạo workspace chỉ với name
  const response = await fetch(`${BASE_API_URL}/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: workspaceForm.name }),
  });

  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(errorResponse.detail || "Failed to create workspace.");
  }

  const data: WorkspaceResponse = await response.json();
  console.debug("Workspace created:", data);
  // 2. Nếu có ảnh, gửi yêu cầu upload ảnh
  if (workspaceForm.imageUrl) {
    if (workspaceForm.imageUrl instanceof File) {
      await uploadWorkspaceImage(data.id, workspaceForm.imageUrl);
    } else {
      throw new Error("Invalid image file.");
    }
  }

  return data;
}

// Hàm upload hình ảnh lên workspace

export async function updateWorkspace(
  worspaceId: string,
  workspaceForm: updateWorkspaceForm,
): Promise<WorkspaceResponse> {
  console.debug(workspaceForm);

  if (!token) {
    router.push("/login");
  }
  // 1. Gửi yêu cầu tạo workspace chỉ với name
  const response = await fetch(`${BASE_API_URL}/workspaces/${worspaceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: workspaceForm.name }),
  });

  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(errorResponse.detail || "Failed to create workspace.");
  }

  const data: WorkspaceResponse = await response.json();
  console.debug("Workspace created:", data);
  // 2. Nếu có ảnh, gửi yêu cầu upload ảnh
  if (workspaceForm.imageUrl && workspaceForm.imageUrl instanceof File) {
    await uploadWorkspaceImage(data.id, workspaceForm.imageUrl);
  } else if (
    typeof workspaceForm.imageUrl === "string" &&
    workspaceForm.imageUrl !== ""
  ) {
    // Nếu chỉ có URL cũ (chuỗi không rỗng), bỏ qua
    console.log("No new image selected, keeping the old one.");
  } else {
    console.log("No image selected, skipping upload.");
  }

  return data;
}

async function uploadWorkspaceImage(
  id: string,
  imageFile: File,
): Promise<void> {
  try {
    console.log("Image size before resize (bytes):", imageFile.size);
    if (imageFile.size > 2 * 1024 * 1024) {
      imageFile = await resizeImage(imageFile, 800, 800);
    }
    console.log("Image size after resize (bytes):", imageFile.size);

    // Upload trực tiếp file nhị phân
    const response = await fetch(`${BASE_API_URL}/workspaces/${id}/image`, {
      method: "POST",
      headers: {
        accept: "text/plain",
        Authorization: `Bearer ${token}`,
      },
      body: imageFile, // Gửi trực tiếp file nhị phân
    });

    if (!response.ok) {
      const errorResponse: ErrorMessage = await response.json();
      throw new Error(
        errorResponse.detail || "Failed to upload workspace image.",
      );
    }

    console.info("Image uploaded successfully for workspace:", id);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload workspace image.");
  }
}
export async function deleteWorkspace(workspaceId: string): Promise<void> {
  console.debug(`Deleting workspace with ID: ${workspaceId}`);

  if (!token) {
    router.push("/sign-in");
    throw new Error("Unauthorized: No access token found.");
  }

  const response = await fetch(`${BASE_API_URL}/workspaces/${workspaceId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(errorResponse.detail || "Failed to delete workspace.");
  }
  console.debug(`Workspace with ID ${workspaceId} deleted successfully.`);
}

export async function resetInviteCode(workspaceId: string ):Promise<void> {
  console.debug(`Resetting invite code for workspace with ID: ${workspaceId}`);

  if(!token){
    router.push("/sign-in");
    throw new Error("Unauthorized: No access token found.");
  }

  const response = await fetch(`${BASE_API_URL}/workspaces/${workspaceId}/reset-invite-code`, {
    method:"PUT",
    headers:{
      Authorization: `Bearer ${token}`,
    },
});
if(!response.ok){
  const errorResponse: ErrorMessage = await response.json();
  throw new Error(errorResponse.detail || "Failed to reset invite code.");
}

}
export async function joinWorkspaceByInviteCode(inviteCode: string): Promise<void> {
  console.log(inviteCode);

  if (!token) {
    router.push("/sign-in");
    throw new Error("Unauthorized: No access token found.");
  }

  try {
    const response = await fetch(`${BASE_API_URL}/workspaces/join?inviteCode=${inviteCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response:", errorResponse); 
      throw new Error(errorResponse.detail || "Failed to join workspace.");
    }
  
    console.debug(`Successfully joined workspace with invite code: ${inviteCode}`);
  } catch (err) {
    console.error("Error joining workspace:", err);
    throw err; // Ném lại lỗi để phía trên có thể xử lý
  }
}
