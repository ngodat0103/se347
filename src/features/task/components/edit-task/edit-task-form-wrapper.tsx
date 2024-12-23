import { Loader } from "lucide-react";

import { fetchWorkspaceMembers } from "@/services/workspaceService";
import { fetchProjects } from "@/services/projectService";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";

import { Card, CardContent } from "@/components/ui/card";
import { fetchTaskById } from "@/services/taskService";
import { EditTaskForm } from "./edit-task-form";
import { useProjectId } from "@/features/project/hook/use-project-id";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

export const EditTaskFormWrapper = ({
  onCancel,
  id,
}: EditTaskFormWrapperProps) => {
  const currentWorkspaceid = useWorkspaceId();
  const currentProjectId = useProjectId();
  const { data: initialValues, isLoading: isLoadingTask } = fetchTaskById(
    currentWorkspaceid,
    currentProjectId,
    id,
  );
  const { data: projects, isLoading: isLoadingProjects } =
    fetchProjects(currentWorkspaceid);
  const { data: members, isLoading: isLoadingMembers } =
    fetchWorkspaceMembers(currentWorkspaceid);
  const projectOptions = projects?.map((project) => ({
    id: project.id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.map((member) => ({
    id: member.id,
    name: member.nickName,
  }));

  const isLoading = isLoadingMembers || isLoadingProjects || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-noen shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) return null;

  return (
    <EditTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      initialValues={initialValues}
    />
  );
};
