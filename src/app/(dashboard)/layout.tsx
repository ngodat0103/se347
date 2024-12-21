"use client";

import { Sidebar } from "../../components/sidebar";
import { Navbar } from "../../components/navbar";
import { CreateWorkspaceModal } from "@/features/workspace/components/create-workspace-modal";
import { CreateProjectModal } from "@/features/project/components/create-project-modal";
import { Suspense } from "react";
import { CreateTaskModal } from "@/features/task/components/create-task-modal";
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Suspense>
      <div className="min-h-screen">
        <CreateWorkspaceModal />
        <CreateProjectModal />
        <CreateTaskModal />
        <div className="flex w-full h-full">
          <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
            <Sidebar />
          </div>
          <div className="lg:pl-[264px] w-full">
            <div className="mx-auto max-w-screen-2xl h-full">
              <Navbar />
              <main className="h-full py-8 px-6 flex flex-col">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
