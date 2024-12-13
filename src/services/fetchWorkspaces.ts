import Cookies from "js-cookie";
export const fetchWorkspaces = async () => {
  try {
    
    const token = Cookies.get("accessToken");

    if (!token) {
      throw new Error("Token không tồn tại trong cookie");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/me`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách workspace");
    }

    const data = await response.json();
    return data;  // Trả về danh sách workspaces
  } catch (err: any) {
    throw new Error(err.message);  // Quản lý lỗi khi lấy dữ liệu
  }
};
