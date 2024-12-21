import { Loader } from "lucide-react";

import { fetchProjects } from "@/services/projectService";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { fetchWorkspaceMembers } from "@/services/workspaceService";

import { Card, CardContent } from "@/components/ui/card";
import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
}

export const CreateTaskFormWrapper = ({
  onCancel,
}: CreateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = fetchProjects(workspaceId,
  );
  const { data: members, isLoading: isLoadingMembers } = fetchWorkspaceMembers(workspaceId);

  const projectOptions = projects?.map((project) => ({
    id: project.id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.map((member) => ({
    id: member.id,
    name: member.nickName,
  }));
  console.log(memberOptions); 

  const isLoading = isLoadingMembers || isLoadingProjects;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-noen shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
    />
  );
};
