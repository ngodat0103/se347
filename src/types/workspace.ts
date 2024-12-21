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
  id: string; // ID của workspace
  name: string; // Tên của workspace
  ownerId: string; // ID của chủ sở hữu workspace
  members: Record<string, WorkspaceMember>; // Danh sách thành viên
  inviteCode: string; // Mã mời tham gia workspace
  imageUrl?: string; // URL của ảnh đại diện workspace
  createdDate: string; // Thời gian tạo workspace
  lastUpdatedDate: string; // Thời gian cập nhật workspace
}
export interface updateWorkspaceForm {
  name: string;
  imageUrl?: File | string;
}
