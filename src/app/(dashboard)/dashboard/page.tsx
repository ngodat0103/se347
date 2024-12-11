// pages/dashboard.tsx
"use client";
import React from "react";
import useAuthGuard from "@/lib/useAuthGuard";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

const Dashboard = () => {
  // useAuthGuard();
  return (
    <div className="bg-neutral-500 p-4 h-full">
      <CreateWorkspaceForm />
    </div>
  );
};

export default Dashboard;
