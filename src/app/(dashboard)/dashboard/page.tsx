"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWorkspaces } from "@/services/fetchWorkspaces";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const workspaces = await fetchWorkspaces();
        if (workspaces.length === 0) {
          router.push("/workspaces/create");
        } else {
          router.push(`/workspaces/${workspaces[0].id}`);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách workspaces:", error);
      }
    };

    getWorkspaces();
  }, [router]);
}
