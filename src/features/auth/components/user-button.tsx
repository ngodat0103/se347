"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";
import { Loader, LogOut } from "lucide-react";
import useUser from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout as logoutService } from "@/services/user_api";
interface User {
  nickName?: string;
  pictureUrl?: string;
  email: string;
  accountId: string;
}

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    //Xoa token trong cookie
    
    logoutService();
    Cookies.remove("accessToken");
    //Chuyen huong ve trang login
    router.push("/sign-in");
  };
  return (
    <div>
      {user ? (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
              <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                <AvatarImage
                  src={
                    user.pictureUrl ||
                    "https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg"
                  }
                  alt="Avatar"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="bottom"
              className="w-50"
              sideOffset={10}
            >
              <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                <Avatar className="size-[52px]  border border-neutral-300">
                  <AvatarImage
                    src={
                      user.pictureUrl ||
                      "https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg"
                    }
                    alt="Avatar"
                  />
                </Avatar>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm font-medium text-neutral-900">
                    {user.nickName}
                  </p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
              </div>
              <DottedSeparator className="mb-1" />
              <DropdownMenuItem
                onClick={() => handleLogout()}
                className="h-10 flex items-center justify-center text-red-700 font-medium cursor-pointer"
              >
                <LogOut className="size-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
          <Loader className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
