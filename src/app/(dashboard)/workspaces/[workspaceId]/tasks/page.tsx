"use client"; 
import { redirect } from "next/navigation";
import { TaskViewSwticher } from "@/features/task/components/TaskViewSwitcher"; 
"use ";
const TasksPage = async () => {

  return (
    <div className="h-full flex flex-col">
      <TaskViewSwticher isHideProjectFilter />
    </div>
  );
};

export default TasksPage;
