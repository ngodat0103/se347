"use client";
import { TaskRequest, TaskResponse } from "@/types/task";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BASE_API_URL } from "./baseApi";
import Cookies from "js-cookie";
import { useQuery  } from "@tanstack/react-query";
const token = Cookies.get("accessToken");

export const createTaskService = () => {
  const mutate = useMutation({
    mutationFn: async ({
      workspaceId,
      projectId,
      taskDto,
    }: {
      workspaceId: string;
      projectId: string;
      taskDto: TaskRequest;
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
      const data: TaskResponse = await response.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Task created successfully");
    },
  });
  return mutate;
};
export const fetchTasksService = (workspaceId :string, projectId :string) => {
  const query = useQuery({
    queryKey: ["tasks",workspaceId,projectId],
    queryFn: async ()=> {
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
      const data: TaskResponse[] = await response.json();
      return data;
    }
  })
  return query; 
};
