import { BASE_API_URL } from "./baseApi";
import  {createProjectForm, ProjectResponse} from "@/types/project";
import Cookies  from "js-cookie";
const token = Cookies.get("accessToken");
import router from "next/router";
import { ErrorMessage } from "@/types/error";
export const fetchProjects = async (workspaceId: string) => {
  const response = await fetch(`${BASE_API_URL}/workspaces/${workspaceId}/projects`,{
    headers: {
        Authorization: `Bearer ${token}`,
    }
  }
  );
if(!response.ok){
    throw new Error("Lỗi khi lấy danh sách project");
}
  const projects: ProjectResponse[] = await response.json();
  return projects ;
};

export async function createProject(
  workspaceId: string,
  projectForm: createProjectForm,
): Promise<ProjectResponse> {

  if (!token) {
    router.push("/login");
  }
  // 1. Gửi yêu cầu tạo project chỉ với name
  const response = await fetch(`${BASE_API_URL}/workspaces/${workspaceId}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: projectForm.name }),
  });

  if (!response.ok) {
    const errorResponse: ErrorMessage = await response.json();
    throw new Error(errorResponse.detail || "Failed to create workspace.");
  }

  const data: ProjectResponse = await response.json();
  console.debug("Workspace created:", data);
  // 2. Nếu có ảnh, gửi yêu cầu upload ảnh
  // if (projectForm.image) {
  //   if (projectForm.image instanceof File) {
  //     await uploadWorkspaceImage(data.id, workspaceForm.imageUrl);
  //   } else {
  //     throw new Error("Invalid image file.");
  //   }
  // }

  return data;
}