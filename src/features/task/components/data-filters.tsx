import { ListCheckIcon, UserIcon, FolderIcon } from "lucide-react";

import { fetchWorkspaceMembers } from "@/services/workspaceService";
import { fetchProjects } from "@/services/projectService";
import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import { fetchProjectById } from "@/services/projectService";

import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } =
    fetchProjects(workspaceId);
  const { data: members, isLoading: isLoadingMembers } =
    fetchWorkspaceMembers(workspaceId);

  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectOptions = projects?.map((project) => ({
    value: project.id,
    label: project.name,
  }));

  const memberOptions = members?.map((member) => ({
    value: member.id,
    label: member.nickName,
  }));

  const [{ assigneeId, dueDate, projectId, status }, setFilters] =
    useTaskFilters();

  const onFilterChange = (
    value: string | Date | TaskStatus | null,
    type: "status" | "assigneeId" | "projectId" | "dueDate",
  ) => {
    if (value === "all" || !value) {
      value = null;
    } else {
      if (type === "dueDate") {
        value = (value as Date).toISOString();
      }
    }
    setFilters({
      [type]: value,
    });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onFilterChange(value, "status")}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onFilterChange(value, "assigneeId")}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All assignees</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onFilterChange(value, "projectId")}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="size-4 mr-2" />
              <SelectValue placeholder="All projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <DatePicker
        placeholder="Due date"
        onChange={(value) => onFilterChange(value, "dueDate")}
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
      />
    </div>
  );
};
