"use client";
import { useQueryState } from "nuqs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { DataFilters } from "./data-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { fetchTasksService } from "@/services/taskService";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { useProjectId } from "@/features/project/hook/use-project-id";
import { Loader } from "lucide-react";
import { DataKanban } from "./data-kanban";
import { useCallback } from "react";
import { TaskStatus } from "@/types/task";
import { updateMultipleTasks } from "@/services/taskService";
interface TaskViewSwticherProps {
  isHideProjectFilter?: boolean;
}

export const TaskViewSwticher = ({
  isHideProjectFilter,
}: TaskViewSwticherProps) => {
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });
  const { open } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const { data: tasks, isLoading: isLoadingTasks } = fetchTasksService(
    workspaceId,
    projectId,
  );
  //console.log(tasks);
  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      updateMultipleTasks(workspaceId, projectId, tasks);
    },
    [],
  );

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button
            size="sm"
            className="w-full lg:w-auto"
            onClick={() => open(undefined)}
          >
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={isHideProjectFilter} />
        <DottedSeparator className="my-4" />

        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks ?? []} />
            </TabsContent>

            <TabsContent value="kanban" className="mt-0">
              <DataKanban onChange={onKanbanChange} data={tasks ?? []} />
            </TabsContent>

            {/* <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent> */}
          </>
        )}
      </div>
    </Tabs>
  );
};
