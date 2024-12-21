export interface CreateWorkspaceForm {
  name: string;
  imageUrl?: File | string;
}

export interface WorkspaceMember {
  id: string; 
  email: string; 
  nickName: string; 
  imageUrl: string; 
  role: "OWNER" | "MEMBER" | "ADMIN"; 
  status: "ACTIVE" | "INACTIVE";
}

export interface WorkspaceResponse {
  id: string; 
  name: string; 
  ownerId: string;
  members: Record<string, WorkspaceMember>; 
  imageUrl?: string; 
  createdDate: string; 
  lastUpdatedDate: string;
}
export interface updateWorkspaceForm {
  name: string;
  imageUrl?: File | string;
}
