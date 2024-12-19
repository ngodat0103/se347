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