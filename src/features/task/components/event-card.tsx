import { ProjectResponse } from "@/types/project";
import { TaskStatus } from "../types";
import { cn } from "@/lib/utils";
import { MemberAvatar } from "@/features/member/components/meber-avatar";
import { ProjectAvatar } from "@/features/project/components/project-avatar";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { useRouter } from "next/navigation";
import { useProjectId } from "@/features/project/hook/use-project-id";

interface EventCardProps {
  title: string;
  assignee: any; // Assuming assignee is an object with a name property
  project: ProjectResponse;
  status: TaskStatus;
  id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500 text-pink-500",
  [TaskStatus.TODO]: "border-l-red-500 text-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500 text-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500 text-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500 text-emerald-500",
};

export const EventCard = ({
  title,
  assignee,
  project,
  status,
  id,
}: EventCardProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // Correcting string interpolation with backticks
    router.push(
      `/workspaces/${workspaceId}/projects/${project.id}/tasks/${id}`,
    );
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer",
          "hover:opacity-75 transition",
          statusColorMap[status],
        )}
      >
        <p className={cn(statusColorMap[status])}>{title}</p>
        <span className="text-muted">{project?.name}</span>
        <div className="flex items-center gap-x-2">
          {" "}
          {/* Increased gap for better spacing */}
          <MemberAvatar name={assignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300" />{" "}
          {/* Corrected typo */}
          <ProjectAvatar name={project?.name} image={project?.imageUrl} />
        </div>
      </div>
    </div>
  );
};
