import { CreateWorkspaceForm, WorkspaceResponse } from "@/types/workspace";
import { ErrorMessage } from "@/types/error";
import Cookies from "js-cookie";
import { resizeImage } from "@/lib/resizeImage";
const token = Cookies.get("accessToken");
import router from "next/router";
export async function createWorkspace(workspaceForm: CreateWorkspaceForm): Promise<WorkspaceResponse> {
    console.debug(workspaceForm);

    if (!token) {
         router.push("/login");
    }
    // 1. Gửi yêu cầu tạo workspace chỉ với name
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({name:workspaceForm.name}),
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
async function uploadWorkspaceImage(id: string, imageFile: File): Promise<void> {
    try {
        console.log("Image size before resize (bytes):", imageFile.size);
        if (imageFile.size > 2 * 1024 * 1024) {
            imageFile = await resizeImage(imageFile, 800, 800);
        }
        console.log("Image size after resize (bytes):", imageFile.size);

        // Upload trực tiếp file nhị phân
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/${id}/image`, {
            method: "POST",
            headers: {
                "accept": "text/plain",
                "Authorization": `Bearer ${token}`,
            },
            body: imageFile // Gửi trực tiếp file nhị phân
        });

        if (!response.ok) {
            const errorResponse: ErrorMessage = await response.json();
            throw new Error(errorResponse.detail || "Failed to upload workspace image.");
        }

        console.info("Image uploaded successfully for workspace:", id);
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload workspace image.");
    }
}



function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}
