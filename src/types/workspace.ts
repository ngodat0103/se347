// Định nghĩa kiểu dữ liệu cho form khi tạo workspace
export interface CreateWorkspaceForm {
    name: string; 
    imageUrl?: File | string;
  }
  
  export interface WorkspaceMember {
    email: string; // Email của thành viên
    nickName: string; // Tên hiển thị của thành viên
    imageUrl: string; // Ảnh đại diện của thành viên
    role: "OWNER" | "MEMBER" | "ADMIN"; // Vai trò của thành viên
    status: "ACTIVE" | "INACTIVE"; // Trạng thái của thành viên
  }
  
  export interface WorkspaceResponse {
    id: string; // ID của workspace
    name: string; // Tên của workspace
    ownerId: string; // ID của chủ sở hữu workspace
    members: Record<string, WorkspaceMember>; // Danh sách thành viên
    imageUrl?: string; // URL của ảnh đại diện workspace
    createdDate: string; // Thời gian tạo workspace
    lastUpdatedDate: string; // Thời gian cập nhật workspace
  }
  export interface updateWorkspaceForm {
    name: string; 
    imageUrl?: File | string;
  }