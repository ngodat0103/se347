"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useParams và useRouter hook để truy cập params và router
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form";
import { fetchWorkspaceDetails } from "@/services/fetchWorkspaces";
import { WorkspaceResponse } from "@/types/workspace";

const WorkspaceSettingsPage = () => {
  const { workspaceId } = useParams(); // Sử dụng useParams để lấy workspaceId từ URL
  const router = useRouter(); // Sử dụng useRouter để lấy router object
  const [initialValues, setInitialValues] = useState<WorkspaceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadWorkspaceDetails = async () => {
      try {
        const data = await fetchWorkspaceDetails(
          typeof workspaceId === "string" ? workspaceId : ""
        ); // Fetch dữ liệu workspace
        setInitialValues(data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin workspace:", error);
        setLoading(false);
      }
    };

    if (workspaceId) {
      loadWorkspaceDetails();
    }
  }, [workspaceId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!initialValues) {
    return <p>Không tìm thấy thông tin workspace</p>;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateWorkspaceForm
        onCancel={() => {
          router.back();
        }}
        showCancelButton={false}
        initialValues={initialValues}
        workspaceId={typeof workspaceId === "string" ? workspaceId : ""}
      />
    </div>
  );
};

export default WorkspaceSettingsPage;
