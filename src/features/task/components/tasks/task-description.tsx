import { ResponseTask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { PencilIcon, XIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { DottedSeparator } from "@/components/dotted-separator";
import { useState } from "react";
import { updateTaskService } from "@/services/taskService";
import { WorkspaceMember } from "@/types/workspace";
import { toast } from "sonner";
interface TaskDescriptionProps {
  task: ResponseTask;
  currentMember: WorkspaceMember;
}
export const TaskDescription = ({ task,currentMember }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description || ""); 

  const { mutate, isPending } = updateTaskService();

  const handleSave = () => {
    if (!currentMember || (currentMember.role !== "OWNER" && currentMember.role !== "ADMINISTRATOR")) {
      toast.error("You do not have permission to delete this task.", {
        style: {
          backgroundColor: "red", 
          color: "white", 
        }
        
      });
      return;
    }
    mutate(
      {
        workspaceId: task.workspaceId,
        projectId: task.project.id,
        taskId: task.id,
        taskDto: {
          name: task.name,
          status: task.status,
          position: task.position,
          assigneeId: task.assignee.userId,
          projectId: task.project.id,
          dueDate: new Date(task.dueDate),
          description: description || "",
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false); // Đóng chế độ chỉnh sửa sau khi lưu thành công
        },
      },
    );
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Description</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <>
              <XIcon className="size-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="size-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)} // Cập nhật giá trị state description
          />
          <Button
            onClick={handleSave}
            size="sm"
            disabled={isPending} // Vô hiệu hóa nút nếu đang xử lý
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-sm font-medium">
            {task.description || (
              <span className="text-muted-foreground">No description</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
