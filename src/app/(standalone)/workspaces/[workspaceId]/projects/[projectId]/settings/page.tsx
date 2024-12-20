"use client";

import { fetchProjectById } from "@/services/projectService";
import { useProjectId } from "@/features/project/hook/use-project-id"; 
import { EditProjectForm} from "@/features/project/components/edit-project-form";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id"; 
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";

const ProjectIdSettingsClient = () => {
  const projectId = useProjectId();
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading } = fetchProjectById(workspaceId, projectId);

  if (isLoading) return <PageLoader />;

  if (!initialValues) return <PageError message="Project not found" />;

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};
export default ProjectIdSettingsClient; 
