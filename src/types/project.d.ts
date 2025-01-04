export interface ProjectResponse {
  id: string;
  name: string;
  imageUrl?: string;
  workspaceId: string;
  createdDate: string;
  lastUpdatedDate: string;
}
export interface createProjectForm {
  name: string;
  image?: File;
}
export interface updateProjectForm {
  name: string;
  image?: File | string;
}

export interface projectAnalyticsResponse {
  taskCount: number;
  taskDifference: number;
  assignedTaskCount: number;
  assignedTaskDifference: number;
  inCompletedTaskCount: number;
  inCompletedTaskDifference: number;
  completedTaskCount: number;
  completedTaskDifference: number;
  overdueTaskCount: number;
  overdueTaskDifference: number;
}
