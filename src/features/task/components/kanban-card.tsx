import { ResponseTask } from "@/types/task";
import { TaskActions } from "./task-actions";
import { MoreHorizontal } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { MemberAvatar } from "@/features/member/components/meber-avatar";
import { TaskDate } from "./task-date";
import { Project } from "@/components/project";
import { ProjectAvatar } from "@/features/project/components/project-avatar";
interface KanbanCardProps {
  task: ResponseTask;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white p-2 mb-1.5 rounded-md shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p>{task.name} </p>
        <TaskActions id={task.id} projectId={task.project.id}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>
      <DottedSeparator />
      <div className="flex item-center gap-x-1.5">
        {task.assignee !=null? (<MemberAvatar
          name={task.assignee.nickName}
          className="w-6 h-6"
          fallbackClassName="text-[10px]"
        />):null}
        <div className="flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
        </div>
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      {/* co the bo doan nay */}
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassname="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};
//3;55;20
