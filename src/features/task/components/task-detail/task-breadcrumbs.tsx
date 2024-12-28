import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, TrashIcon } from "lucide-react";

import { ProjectResponse } from "@/types/project";
import { ProjectAvatar } from "@/features/project/components/project-avatar";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/confirm";
import { ResponseTask } from "@/types/task";

// import { Task } from "../types";
import { deleteTaskService } from "@/services/taskService";
import { useProjectId } from "@/features/project/hook/use-project-id";
import { useTaskId } from "../../hooks/use-task-id";
interface TaskBreadcrumbsProps {
  project: ProjectResponse;
  task: ResponseTask;
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive",
  );

  const { mutate, isPending } = deleteTaskService();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    const projectId = useProjectId();
    const taskId = useTaskId();
    mutate({ workspaceId, projectId, taskId });
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />

      <Link
        href={`/workspaces/${workspaceId}/projects/${project.id}`}
        className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition"
      >
        {project.name}
      </Link>

      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />

      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>

      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        onClick={onDelete}
        disabled={isPending}
      >
        <TrashIcon className="size-4 mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
};
