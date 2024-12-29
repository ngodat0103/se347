"use client";
import { fetchProjectById } from "@/services/projectService";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { useProjectId } from "@/features/project/hook/use-project-id";

import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { ProjectAvatar } from "@/features/project/components/project-avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import { TaskViewSwticher } from "@/features/task/components/TaskViewSwitcher";
import { fetchProjectAnalytics } from "@/services/projectService";
import { Analytics } from "@/components/analytics";
const projectIdPage = () => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const { data: analyticsResponse, isLoading: isLoaddingAnalytics } =
    fetchProjectAnalytics(workspaceId, projectId);

  const { data: projectReponse, isLoading: isLoaddingProject } =
    fetchProjectById(workspaceId, projectId);

  if (isLoaddingProject) {
    return <PageLoader />;
  }
  if (!projectReponse) return <PageError message="Project not found" />;
  else if (projectReponse != null) {
    {
      return (
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <ProjectAvatar
                name={projectReponse.name}
                image={projectReponse.imageUrl}
                className="size-8"
              />
              <p className="text-lg font-semibold">{projectReponse.name}</p>
            </div>

            <div className="">
              <Button variant="secondary" size="sm" asChild>
                <Link
                  href={`/workspaces/${workspaceId}/projects/${projectId}/settings`}
                >
                  <PencilIcon className="size-4 mr-2" />
                  Edit Project
                </Link>
              </Button>
            </div>
          </div>
          {analyticsResponse && <Analytics {...analyticsResponse} />}
          <TaskViewSwticher />
        </div>
      );
    }
  }
};
export default projectIdPage;
