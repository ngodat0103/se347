"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

//Bao ve trang dashboard 
const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken"); // Lấy token từ cookie
    if (!token) {
      // Nếu không có token, chuyển hướng về trang đăng nhập
      router.push("/sign-in");
    }
  }, [router]); // Hook sẽ chạy lại khi router thay đổi
};

export default useAuthGuard;
