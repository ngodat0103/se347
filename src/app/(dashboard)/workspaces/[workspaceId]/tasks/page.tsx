"use client"; 
import { redirect } from "next/navigation";
import { TaskViewSwitcher } from "@/features/task/components/TaskViewSwitcher"; 
"use ";
const TasksPage = async () => {

  return (
    <div className="h-full flex flex-col">
      <TaskViewSwitcher isHideProjectFilter />
    </div>
  );
};

export default TasksPage;
