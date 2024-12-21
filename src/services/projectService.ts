import { BASE_API_URL } from "./baseApi";
import { createProjectForm, ProjectResponse } from "@/types/project";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");
import router from "next/router";
import { ErrorMessage } from "@/types/error";
import { useQuery } from "@tanstack/react-query";

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
  // if (projectForm.image) {
  //   if (projectForm.image instanceof File) {
  //     await uploadWorkspaceImage(data.id, workspaceForm.imageUrl);
  //   } else {
  //     throw new Error("Invalid image file.");
  //   }
  // }

  return data;
}
