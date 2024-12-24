"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import { deleteMember } from "@/services/workspaceService";
import { Fragment } from "react";
import useUser from "@/hooks/useUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoreHorizontal } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { fetchWorkspaceMembers } from "@/services/workspaceService";
import { MemberAvatar } from "@/features/member/components/meber-avatar";
import { Loader } from "lucide-react";
import { updateRoleMember } from "@/services/workspaceService";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MembersList = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const workspaceId = useWorkspaceId();

  const { data: members, isLoading: isLoadingMembers } =
    fetchWorkspaceMembers(workspaceId);

  const { user } = useUser();
  const currentUserEmail = user?.email;
  //Kiem tra role user
  const currentUserRole = members?.find(
    (member: any) => member.email === currentUserEmail,
  )?.role;
  console.log(currentUserRole);
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleRemoveMember = async (id: string) => {
    try {
      await deleteMember(workspaceId, id);
      setSuccessMessage(`The member has been successfully removed!`);
      setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 2000);
    } catch (error) {
      console.error("Error removing member:", error);
      setErrorMessage(
        "An error occurred while removing the member. Please try again!",
      );
    }
  };

  const handleSetRole = async (id: string, role: "OWNER" | "MEMBER") => {
    try {
      await updateRoleMember(workspaceId, id, role);
      setSuccessMessage(`The member's role has been updated to ${role}!`);
      setTimeout(() => {
        window.location.reload(); // Reload the page to reflect changes
      }, 2000); // Optional delay for showing success message
    } catch (error) {
      console.error("Error updating member role:", error);
      setErrorMessage("An error occurred while updating the member's role.");
    }
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  });

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-u-0">
        <Button variant="secondary" size="sm" onClick={handleBack}>
          <ArrowLeftIcon className="size-4 mr-2" />
          Back
        </Button>
        <CardTitle className="text-x; font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {/* Kiểm tra trạng thái đang tải */}
        {isLoadingMembers ? (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div>
            {/* Hiển thị danh sách thành viên nếu không còn đang tải */}
            {members?.map((member: any, index: number) => (
              <Fragment key={index}>
                <div className="flex items-center gap-2">
                  <MemberAvatar
                    className="soze-10"
                    fallbackClassName="text-lg"
                    name={member.nickName}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{member.nickName}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                  <div className="flex items-center ml-auto">
                    <p className="text-xs text-muted-foreground mr-3">
                      {member.role || "No Role"}
                    </p>
                    {/* Hiển thị Dropdown chỉ nếu người dùng là owner hoặc admin */}
                    {member.email !== currentUserEmail &&
                      (currentUserRole === "OWNER" ||
                        currentUserRole === "ADMIN") && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              className="ml-auto"
                              variant="secondary"
                              size="icon"
                            >
                              <MoreHorizontal className="size-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" align="end">
                            <DropdownMenuItem
                              className="font-medium"
                              onClick={() => handleSetRole(member.id, "OWNER")}
                              disabled={false}
                            >
                              Set as Administrator
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="font-medium"
                              onClick={() => handleSetRole(member.id, "MEMBER")}
                              disabled={false}
                            >
                              Set as Member
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className=" text-red-600 font-medium"
                              onClick={() => handleRemoveMember(member.id)}
                              disabled={false}
                            >
                              Remove {member.nickName}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                  </div>
                </div>
                {index !== members.length - 1 && (
                  <Separator className="my-2.5" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </CardContent>
      {/* Thong bao */}
      <div
        className={clsx(
          "fixed bottom-5 right-5 p-4 rounded-lg shadow-md transition-all duration-500 ease-in-out",
          errorMessage || successMessage
            ? "opacity-100 visible"
            : "opacity-0 invisible",
          errorMessage ? "bg-red-500 text-white" : "bg-green-500 text-white",
        )}
      >
        {errorMessage || successMessage}
      </div>
    </Card>
  );
};
