"use client";
import { useTaskId } from "@/features/task/hooks/use-task-id";
import { DottedSeparator } from "@/components/dotted-separator";
import { TaskBreadcrumbs } from "@/features/task/components/task-detail/task-breadcrumbs";
import { TaskOveriew } from "@/features/task/components/task-detail/task-overview";
import { TaskDescription } from "@/features/task/components/task-detail/task-description";
import { fetchTaskById } from "@/services/taskService";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { useProjectId } from "@/features/project/hook/use-project-id";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
const TaskIdPage = async () => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const taskId = useTaskId();
  const { data, isLoading } = fetchTaskById(workspaceId, projectId, taskId);
  if (isLoading) {
    return <PageLoader />;
  }
  if (!data) {
    return <PageError message="Task not found" />;
  }

  return (
    <div className="flex flex-col">
      <TaskBreadcrumbs project={data.project} task={data} />

      <DottedSeparator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOveriew task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
};

export default TaskIdPage;
