import { BASE_API_URL } from "./baseApi";
import { createProjectForm, ProjectResponse } from "@/types/project";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");
import router from "next/router";
import { ErrorMessage } from "@/types/error";
import { useQuery } from "@tanstack/react-query";
import { resizeImage } from "@/lib/resizeImage";
import { updateProjectForm } from "@/types/project";

export const fetchProjectById = (workspaceId: string, projectId: string) => {
  const query = useQuery({
    queryKey: ["project", workspaceId, projectId],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Lỗi khi lấy Project");
      }
      const project: ProjectResponse = await response.json();
      return project;
    },
  });
  return query;
};

export const fetchProjects = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_API_URL}/workspaces/${workspaceId}/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects.");
      }
      const data: ProjectResponse[] = await response.json();
      return data;
    },
  });
  return query;
};

export async function createProject(
  workspaceId: string,
  projectForm: createProjectForm,
): Promise<ProjectResponse> {
  if (!token) {
    router.push("/login");
  }
  // 1. Gửi yêu cầu tạo project chỉ với name
  const response = await fetch(
    `${BASE_API_URL}/workspaces/${workspaceId}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: projectForm.name }),
    },
  );

  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(errorResponse.detail || "Failed to create workspace.");
  }

  const data: ProjectResponse = await response.json();
  console.debug("Workspace created:", data);
 // 2. Nếu có ảnh, gửi yêu cầu upload ảnh
  if (projectForm.image) {
    if (projectForm.image instanceof File) {
      await uploadProjectImage(data.workspaceId,data.id, projectForm.image);
    } else {
      throw new Error("Invalid image file.");
    }
  }

  return data;
}
async function uploadProjectImage(
  workspaceId: string,    
  projectId: string,     
  imageFile: File,       
): Promise<void> {
  try {
    console.log("Image size before resize (bytes):", imageFile.size);
    if (imageFile.size > 2 * 1024 * 1024) { 
      imageFile = await resizeImage(imageFile, 800, 800);
    }
    console.log("Image size after resize (bytes):", imageFile.size);

    const response = await fetch(`${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/image`, {
      method: "POST",
      headers: {
        accept: "text/plain",
        Authorization: `Bearer ${token}`, 
      },
      body: imageFile, 
    });

    if (!response.ok) {
      const errorResponse: ErrorMessage = await response.json();
      throw new Error(
        errorResponse.detail || "Failed to upload project image.",
      );
    }

    console.info("Image uploaded successfully for project:", projectId);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload project image.");
  }
}

export async function deleteProject(projectId: string, workspaceId: string) {
  if (!token) {
    router.push("/login");
  }
  const response = await fetch(
    `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(errorResponse.detail || "Failed to delete project.");
  }
}

export async function updateProject(
  projectId: string,
  workspaceId: string,
  projectForm: updateProjectForm
): Promise<ProjectResponse> {
  console.debug(projectForm);

  if (!token) {
    router.push("/login");
  }

  // 1. Gửi yêu cầu cập nhật project chỉ với name
  const response = await fetch(
    `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: projectForm.name }),
    }
  );

  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(
      errorResponse.detail || "Failed to update project."
    );
  }

  const data: ProjectResponse = await response.json();
  console.debug("Project updated:", data);

  // 2. Nếu có ảnh, gửi yêu cầu upload ảnh
  if (projectForm.image && projectForm.image instanceof File) {
    await uploadProjectImage(workspaceId,projectId, projectForm.image);
  } else if (
    typeof projectForm.image === "string" &&
    projectForm.image !== ""
  ) {
    // Nếu chỉ có URL cũ (chuỗi không rỗng), bỏ qua
    console.log("No new image selected, keeping the old one.");
  } else {
    console.log("No image selected, skipping upload.");
  }

  return data;
}

