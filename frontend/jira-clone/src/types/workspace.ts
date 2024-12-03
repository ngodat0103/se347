// Định nghĩa kiểu dữ liệu cho form khi tạo workspace
export interface CreateWorkspaceForm {
    name: string; 
    imageUrl?: File | string;
  }
  
  // Định nghĩa kiểu dữ liệu phản hồi từ server khi tạo workspace thành công
  export interface WorkspaceResponse {
    workspaceId: string; // ID của workspace mới được tạo
    name: string; // Tên của workspace
    imageUrl?: File | string;
    description?: string; // Mô tả của workspace (nếu có)
    createdAt: string; // Thời gian tạo workspace
    updatedAt: string; // Thời gian cập nhật workspace
  }
  