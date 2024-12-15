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
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else if (typeof err === "string") {
      throw new Error(err);
    } else {
      throw new Error("Lỗi không xác định");
    }
  }
};


export const fetchWorkspaceDetails = async (workspaceId: string) => {
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

    const workspaces = await response.json();

    // Lọc workspace theo ID
    const workspace = workspaces.find((ws: any) => ws.id === workspaceId);

    if (!workspace) {
      throw new Error("Workspace không tồn tại");
    }

    return workspace; // Trả về thông tin workspace
  } catch (err: any) {
    throw new Error(err.message);
  }
};

