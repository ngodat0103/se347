"use client";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  joinWorkspaceByInviteCode,
  fetchWorkspaceByInviteCode,
  fetchJoinWorkspace,
} from "@/services/workspaceService";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  inviteCode: string;
}

const JoinWorkspaceForm = ({ inviteCode }: JoinWorkspaceFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { user } = useUser();
  const router = useRouter();

  const {
    data: workspace,
    isLoading,
    error: fetchError,
  } = fetchWorkspaceByInviteCode(inviteCode);
  useEffect(() => {
    if (fetchError) {
      setError("Invite code không hợp lệ hoặc không tồn tại.");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [fetchError]);

  // Nếu đang tải dữ liệu, chỉ hiển thị thông báo "Checking invite code..."
  if (isLoading) {
    return (
      <div className="p-7">
        <p className="text-neutral-500">Checking invite code...</p>
      </div>
    );
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return (
      <div className="p-7">
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    );
  }
  console.log("workspace", workspace);
  console.log("error", fetchError);
  if (fetchError) {
    return (
      <div className="p-7">
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    );
  }
  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!workspace) {
        setError("Workspace không tìm thấy.");
        return;
      }

      // Kiểm tra nếu user đã là owner
      if (workspace?.ownerId === user?.userId) {
        setError("You are already the owner of this workspace.");
        return;
      }

      const isAlreadyMember = workspace?.members.hasOwnProperty(
        user?.userId ?? "",
      );
      if (isAlreadyMember) {
        setError("You are already a member of this workspace.");
        return;
      }

      await joinWorkspaceByInviteCode(inviteCode);
      setSuccessMessage("User added to workspace successfully!");

      setTimeout(() => {
        router.push(`/workspaces/${workspace?.id}`);
      }, 500);
    } catch (err: any) {
      setError(
        err.message || "Failed to join workspace. Please try again later.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>
        <CardDescription className="text-neutral-500">
          {workspace
            ? `You've been invited to join this workspace: ${workspace.name}`
            : "Checking invite code..."}
        </CardDescription>
      </CardHeader>
      <div>
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            variant="secondary"
            type="button"
            asChild
            size="lg"
            className="w-full lg:w-fit"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            size="lg"
            className="w-full lg:w-fit"
            type="button"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Workspace"}
          </Button>
        </div>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
