export enum TaskStatus {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
  }
export interface TaskRequest {
    name: string;
    status: TaskStatus;
    dueDate: Date;
    assigneeId: string;
}
export interface TaskResponse {
    id: string;
    name: string;
    status: TaskStatus;
    dueDate: Date;
    assigneeId: string;
    description: string;
    workspaceId: string;
    projectId: string;
    createAt: Date;
    lastUpdatedAt: Date;
}