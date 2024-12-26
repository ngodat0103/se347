import { ProjectResponse } from "./project";
import { UserResponse } from "./user";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}
export interface RequestTask {
  name: string;
  status: TaskStatus;
  dueDate: Date;
  assigneeId: string;
}
export interface ResponseTask {
  id: string;
  name: string;
  status: TaskStatus;
  dueDate: string;
  project: ProjectResponse;
  assignee: UserResponse;
  description: string;
  workspaceId: string;
  createAt: Date;
  lastUpdatedAt: Date;
  position: number;
}
