"use client";
import { BASE_API_URL } from "./baseApi";
import { createProjectForm, ProjectResponse } from "@/types/project";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ErrorMessage } from "@/types/error";
import { useQuery } from "@tanstack/react-query";
import { resizeImage } from "@/lib/resizeImage";
import { updateProjectForm } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const fetchProjectById = (workspaceId: string, projectId: string) => {
  const query = useQuery({
    queryKey: ["project", workspaceId, projectId],
    queryFn: async () => {
      const token = Cookies.get("accessToken");
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
      const token = Cookies.get("accessToken");
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

const createProjectAPI = async ({
  workspaceId,
  projectForm,
}: {
  workspaceId: string;
  projectForm: createProjectForm;
}) => {
  const token = Cookies.get("accessToken");
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

  // Handle image upload if needed
  if (projectForm.image) {
    if (projectForm.image instanceof File) {
      await uploadProjectImage(data.workspaceId, data.id, projectForm.image);
    } else {
      throw new Error("Invalid image file.");
    }
  }

  return data;
};

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProjectAPI,
    onSuccess: (data) => {
      console.debug("Workspace created:", data);
      // Invalidate and refetch queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      // Optionally redirect or perform other success actions
      toast.success("Project created successfully");
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });
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
    const token = Cookies.get("accessToken");
    const response = await fetch(
      `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/image`,
      {
        method: "POST",
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: imageFile,
      },
    );

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

export const deleteProjectAPI = async ({
  workspaceId,
  projectId,
}: {
  workspaceId: string;
  projectId: string;
}) => {
  const token = Cookies.get("accessToken");
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
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProjectAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
  });
};

const updateProjectAPI = async ({
  workspaceId,
  projectId,
  projectForm,
}: {
  workspaceId: string;
  projectId: string;
  projectForm: updateProjectForm;
}) => {
  const token = Cookies.get("accessToken");
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
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.detail || "Failed to update project.");
  }

  const data = await response.json();
  console.debug("Project updated:", data);

  // Handle image upload if needed
  if (projectForm.image && projectForm.image instanceof File) {
    await uploadProjectImage(workspaceId, projectId, projectForm.image);
  } else if (
    typeof projectForm.image === "string" &&
    projectForm.image !== ""
  ) {
    console.log("No new image selected, keeping the old one.");
  } else {
    console.log("No image selected, skipping upload.");
  }

  return data;
};

// Use Mutation hook
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProjectAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", data.workspaceId, data.projectId],
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(
        "Project updated successfully. For image changes, it may take a few seconds to reflect.",
      );
      // router.push(`/workspaces/${data.workspaceId}/projects/${data.id}`);
    },
    onError: (error) => {
      console.error("Error updating project:", error.message);
      toast.error("Error updating project, please try again later");
    },
  });
};
