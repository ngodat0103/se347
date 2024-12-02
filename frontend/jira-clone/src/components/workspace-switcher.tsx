"use client";

import { useState, useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";

interface Workspace {
  workspaceId: string;
  name: string;
  imageUrl: string | null;
}

export const WorkspaceSwitcher = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch("http://localhost:3001/workspace");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy danh sách workspace");
        }
        const data = await response.json();
        setWorkspaces(data.workspaces); // Lấy mảng workspaces từ kết quả trả về
        setSelectedWorkspace(data.workspaces[0] || null); // Chọn workspace đầu tiên
        console.log("Dữ liệu đã được GET từ API:", data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="size-4 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="Chưa chọn workspace" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.map((workspace) => (
            <SelectItem
              key={workspace.workspaceId}
              value={workspace.workspaceId}
            >
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
