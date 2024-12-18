import { BASE_API_URL } from "./baseApi";
import  {ProjectResponse} from "@/types/project";
import Cookies  from "js-cookie";
const token = Cookies.get("accessToken");

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