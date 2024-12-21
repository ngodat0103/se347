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
import { useState } from "react";
import { joinWorkspaceByInviteCode } from "@/services/workspaceService";
import { log } from "console";

interface JoinWorkspaceFormProps {
    inviteCode: string;
}

const JoinWorkspaceForm = ({ inviteCode }: JoinWorkspaceFormProps) => {
    const [loading, setLoading] = useState(false); // Quản lý trạng thái loading
    const [error, setError] = useState<string | null>(null); // Quản lý lỗi
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Thông báo thành công
  
    const onSubmit = async () => {
      setLoading(true);
      setError(null); 
      setSuccessMessage(null);
      
      try {
        
        await joinWorkspaceByInviteCode(inviteCode);
  
        // Nếu thành công, hiển thị thông báo
        setSuccessMessage("User added to workspace successfully!");
      } catch (err: any) {
        // Xử lý lỗi
        setError(err.message || "Failed to join workspace. Please try again later.");
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
          You&apos;ve been invited to join this workspace: {inviteCode}
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
        {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
