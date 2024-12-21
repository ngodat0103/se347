"use client";
import { useParams } from "next/navigation";

import useUser from "@/hooks/useUser"; // Import useUser để lấy thông tin người dùng
import JoinWorkspaceForm from "@/features/workspace/components/join-workspace-form"; // Import JoinWorkspaceForm
// Import component JoinWorkspaceForm

const WorkspaceJoinInvitePage = () => {
  const { user, loading, error } = useUser(); // Sử dụng useUser để lấy thông tin người dùng
  const inviteCode = useParams().inviteCode as string;
  // Kiểm tra trạng thái của loading hoặc lỗi
  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <JoinWorkspaceForm inviteCode={inviteCode} />
    </div>
  );
};

export default WorkspaceJoinInvitePage;
