"use client";

import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { useProjectId } from "@/features/project/hook/use-project-id";
import { useTaskId } from "@/features//task/hooks/use-task-id";
import { fetchTaskById } from "@/services/taskService";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { TaskBreadcrumb } from "@/features/task/components/task-breadcrumbs";
import { DottedSeparator } from "@/components/dotted-separator";
import { TaskOverview } from "@/features/task/components/task-overview";
import { TaskDescription } from "@/features/task/components/task-description";

export const TaskIdClient = () => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const taskId = useTaskId();
  const { data: initialValues, isLoading: isLoadingTask } = fetchTaskById(
    workspaceId,
    projectId,
    taskId,
  );
  console.log(initialValues);
  if (isLoadingTask) {
    return <PageLoader />;
  }
  if (!initialValues) {
    return <PageError message="Task not found" />;
  }
  return (
    <div className="flex flex-col">
      <TaskBreadcrumb project={initialValues.project} task={initialValues} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={initialValues} />
        <TaskDescription task={initialValues} />
      </div>
    </div>
  );
};
export default TaskIdClient;
