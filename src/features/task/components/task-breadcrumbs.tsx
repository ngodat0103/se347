import { ProjectAvatar } from "@/features/project/components/project-avatar";
import { ProjectResponse } from "@/types/project";
import { ResponseTask } from "@/types/task";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/confirm";
import { deleteTaskService } from "@/services/taskService";
import { useRouter } from "next/navigation";
import { WorkspaceMember } from "@/types/workspace";
import { toast } from "sonner";
interface TaskBreadcrumbProps {
  project: ProjectResponse;
  task: ResponseTask;
  currentMember: WorkspaceMember;
}
export const TaskBreadcrumb = ({ project, task,currentMember }: TaskBreadcrumbProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone.",
    "destructive",
  );
  const { mutate: deleteTaskMutate, isPending } = deleteTaskService();
  const router = useRouter();
  const onDelete = async () => {
    if (!currentMember || currentMember.role !== "OWNER") {
      
    toast.error("You do not have permission to delete this task."); 
    return;
    }
    const ok = await confirm();
    if (!ok) return;
    deleteTaskMutate(
      {
        workspaceId: task.workspaceId,
        projectId: project.id,
        taskId: task.id,
      },
      {
        onSuccess: () => {
          router.push(
            `/workspaces/${task.workspaceId}/projects/${project.id}`
          );
        },
        onError: (error) => {
          console.error("Failed to delete task:", error);
        },
      }
    );
  };
  
  
  console.log(task.workspaceId, project.id, task.id);
  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${task.workspaceId}/projects/${project.id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        onClick={onDelete}
      >
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
};
