"use client";
import { RequestTask, ResponseTask } from "@/types/task";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_API_URL } from "./baseApi";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { METHODS } from "http";
const token = Cookies.get("accessToken");

export const createTaskService = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({
      workspaceId,
      projectId,
      taskDto,
    }: {
      workspaceId: string;
      projectId: string;
      taskDto: RequestTask;
    }) => {
      const response = await fetch(
        `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskDto),
        },
      );

      if (!response.ok) {
        throw new Error("Error creating task");
      }
      const data: ResponseTask = await response.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Error creating task, please try again later");
    },
  });
  return mutate;
};
export const fetchTasksService = (workspaceId: string, projectId: string) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId, projectId],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Error when fetching task");
      }
      const data: ResponseTask[] = await response.json();
      return data;
    },
  });
  return query;
};

export const deleteTaskService = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({
      workspaceId,
      projectId,
      taskId,
    }: {
      workspaceId: string;
      projectId: string;
      taskId: string;
    }) => {
      const response = await fetch(
        `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error deleting task");
      }
    },
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Error deleting task, please try again later");
    },
  });
  return mutate;
};

export const updateTaskService = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Error updating task, please try again later");
    },
    mutationFn: async ({
      workspaceId,
      projectId,
      taskId,
      taskDto,
    }: {
      workspaceId: string;
      projectId: string;
      taskId: string;
      taskDto: RequestTask;
    }) => {
      const response = await fetch(
        `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "PUT",
          body: JSON.stringify(taskDto),
        },
      );
      if (!response.ok) {
        throw new Error("Error updating task");
      }
      const data: ResponseTask = await response.json();
      return data;
    },
  });
  return mutate;
};
export const fetchTaskById = (
  workspaceId: string,
  projectId: string,
  taskId: string,
) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId, projectId, taskId],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Error when fetching task");
      }
      const data: ResponseTask = await response.json();
      return data;
    },
  });
  return query;
};
