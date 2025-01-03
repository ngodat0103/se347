"use client";
import { RequestTask, ResponseTask } from "@/types/task";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_API_URL } from "./baseApi";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TaskStatus } from "@/types/task";

export const createTaskService = () => {
  const token = Cookies.get("accessToken");
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
      queryClient.invalidateQueries({ queryKey: ["projectAnalytics"] });
    },
    onError: () => {
      toast.error("Error creating task, please try again later");
    },
  });
  return mutate;
};
export const fetchTasksService = (
  workspaceId: string,
  projectId: string,
  myTasks: boolean,
) => {
  const token = Cookies.get("accessToken");
  const query = useQuery({
    queryKey: ["tasks", workspaceId, projectId],
    queryFn: async () => {
      const ENDPOINT = myTasks
        ? `${BASE_API_URL}/workspaces/${workspaceId}/my-tasks`
        : `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks`;

      const response = await fetch(`${ENDPOINT}`, {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
  const token = Cookies.get("accessToken");
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
      queryClient.invalidateQueries({ queryKey: ["projectAnalytics"] });
    },
    onError: () => {
      toast.error("Error deleting task, please try again later");
    },
  });
  return mutate;
};

export const updateTaskService = () => {
  const token = Cookies.get("accessToken");
  const queryClient = useQueryClient();

  const mutate = useMutation({
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projectAnalytics"] });
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
  const token = Cookies.get("accessToken");
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
// Hàm gọi API  không sử dụng Hook
export const fetchTaskByIdAPI = async (
  workspaceId: string,
  projectId: string,
  taskId: string,
): Promise<ResponseTask> => {
  const token = Cookies.get("accessToken");
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

  return response.json();
};

export const useUpdateMultipleTasks = () => {
  const token = Cookies.get("accessToken");
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      toast.success("Tasks updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projectAnalytics"] });
    },
    onError: () => {
      toast.error("Error updating tasks, please try again later");
    },
    mutationFn: async ({
      workspaceId,
      projectId,
      tasks,
    }: {
      workspaceId: string;
      projectId: string;
      tasks: { $id: string; status: TaskStatus; position: number }[];
    }) => {
      const promises = tasks.map(async (task) => {
        const taskDetails = await fetchTaskByIdAPI(
          workspaceId,
          projectId,
          task.$id,
        );

        const taskDto: RequestTask = {
          name: taskDetails.name || "Untitled",
          status: task.status,
          position: task.position,
          dueDate: new Date(),
          assigneeId: taskDetails.assignee.userId || "user",
          projectId: projectId,
        };

        const url = `${BASE_API_URL}/workspaces/${workspaceId}/projects/${projectId}/tasks/${task.$id}`;

        return axios.put(url, taskDto, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adjust as needed
          },
        });
      });

      return Promise.all(promises);
    },
  });
};
export const useUpdateTask = () => {
  const token = Cookies.get("accessToken");
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projectAnalytics"] });
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
};
