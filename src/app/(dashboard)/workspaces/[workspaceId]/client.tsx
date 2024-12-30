"use client";

import { useWorkspaceId } from "@/features/workspace/hook/use-workspace-id";
import {
  fetchWorkspaceMembers,
  fetchWorkspaceAnalytics,
  fetchWorkspaceTasks,
} from "@/services/workspaceService";
import { fetchProjects } from "@/services/projectService";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { Analytics } from "@/components/analytics";
import { ResponseTask } from "@/types/task";
import { DottedSeparator } from "@/components/dotted-separator";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectResponse } from "@/types/project";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProjectAvatar } from "@/features/project/components/project-avatar";
import { WorkspaceMember } from "@/types/workspace";
import { MemberAvatar } from "@/features/member/components/meber-avatar";

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: workspaceAna, isLoading: isLoadingWorkspaceAna } =
    fetchWorkspaceAnalytics(workspaceId);

  const { data: workspaceTasks = [], isLoading: isLoadingWorkspaceTasks } =
    fetchWorkspaceTasks(workspaceId);

  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const { data: members, isLoading: isLoadingMembers } = workspaceId
    ? fetchWorkspaceMembers(workspaceId)
    : { data: null, isLoading: false };

  const { data: projects, isLoading: isLoadingProjects } = workspaceId
    ? fetchProjects(workspaceId)
    : { data: null, isLoading: false };

  const isLoading =
    isLoadingWorkspaceAna ||
    isLoadingWorkspaceTasks ||
    isLoadingMembers ||
    isLoadingProjects;
  if (isLoading) return <PageLoader />;
  console.log(members);

  if (!workspaceAna || !members || !projects)
    return <PageError message="Failer to load workspace data" />;
  return (
    <div className="h-full flex flex-col">
      <Analytics {...workspaceAna} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <TaskList
            tasks={workspaceTasks}
            total={workspaceTasks.length}
            showAll={showAllTasks}
            setShowAll={setShowAllTasks}
          />
          <MemberList members={members} />
        </div>

        <ProjectList
          projects={projects}
          total={projects.length}
          showProject={showAllProjects}
          setShowProject={setShowAllProjects}
        />
      </div>
    </div>
  );
};

interface TaskListProps {
  tasks: ResponseTask[];
  total: number;
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
}
export const TaskList = ({
  tasks,
  total,
  showAll,
  setShowAll,
}: TaskListProps) => {
  const data = showAll ? tasks : tasks.slice(0, 2);
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {data.length > 0 ? (
            data.map((task) => (
              <li key={task.id}>
                <Link
                  href={`/workspaces/${task.workspaceId}/projects/${task.project.id}/tasks/${task.id}`}
                >
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                    <CardContent className="p-4">
                      <p className="text-lg font-medium truncate">
                        {task.name}
                      </p>
                      <div className="flex items-center gap-x-2">
                        <p>{task.project?.name}</p>
                        <div className="size-1 rounded-full bg-neutral-300" />
                        <div className="text-sm text-muted-foreground flex items-center">
                          <CalendarIcon className="size-3 mr-1" />
                          <span className="truncate">
                            {formatDistanceToNow(new Date(task.dueDate))}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
              No tasks found
            </li>
          )}
        </ul>
        {/* Show all */}
        {data.length > 0 && (
          <Button
            variant="muted"
            className="w-full mt-2 hover:opacity-75"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show All"}
          </Button>
        )}
      </div>
    </div>
  );
};

interface ProjectListProps {
  projects: ProjectResponse[];
  total: number;
  showProject: boolean;
  setShowProject: (showProject: boolean) => void;
}
export const ProjectList = ({
  projects,
  total,
  showProject,
  setShowProject,
}: ProjectListProps) => {
  const data = showProject ? projects : projects.slice(0, 2);
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Project ({total})</p>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid gird-cols-1 gap-y-4">
          {data.length > 0 ? (
            data.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/workspaces/${project.workspaceId}/projects/${project.id}`}
                >
                  <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                    <CardContent className="p-4 flex items-center gap-x-2">
                      <ProjectAvatar
                        name={project.name}
                        image={project.imageUrl}
                        className="size-12"
                        fallbackClassname="text-[20px]"
                      />
                      <p className=" ml-3 text-lg font-medium truncate">
                        {project.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
              No project found
            </li>
          )}
        </ul>
        {/* Show all */}
        {data.length > 0 && (
          <Button
            variant="muted"
            className="w-full mt-2 hover:opacity-75"
            onClick={() => setShowProject(!showProject)}
          >
            {showProject ? "Show Less" : "Show All"}
          </Button>
        )}
      </div>
    </div>
  );
};

interface MemberListProps {
  members: WorkspaceMember[];
}

export const MemberList = ({ members }: MemberListProps) => {
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Members ({members.length})</p>
        </div>
        <DottedSeparator className="mb-6" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member.id}>
                <Card className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <MemberAvatar
                      name={member.nickName}
                      className="size-14 mb-3"
                      fallbackClassName="text-xl"
                    />
                    <div className="flex flex-col items-center overflow-hidden">
                      <p className="text-lg font-medium line-clamp-1">
                        {member.nickName}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {member.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))
          ) : (
            <li className="text-center text-muted-foreground text-sm">
              No members found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
