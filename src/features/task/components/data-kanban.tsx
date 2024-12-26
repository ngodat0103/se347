import React, { useState, useCallback } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { ResponseTask, TaskStatus } from "../../../types/task";
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TasksStatus = {
  [key in TaskStatus]: ResponseTask[];
};

interface DataKanbanProps {
  data: ResponseTask[];
}

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksStatus>(() => {
    const initialTasks: TasksStatus = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };
    // Duyet qua danh sach data phan loai theo status vao initialTasks
    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });
    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => {
        const dateA = new Date(a.project.lastUpdatedDate).getTime();
        const dateB = new Date(a.project.lastUpdatedDate).getTime();

        return dateA - dateB; // Sắp xếp tăng dần
      });
    });
    return initialTasks;
  });

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    let updatesPayload: { $id: string; status: TaskStatus; position: number }[];

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };

      const sourceColumn = [...newTasks[sourceStatus]];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      if (!movedTask) {
        console.error("Task not found");
        return prevTasks;
      }

      const updatedMovedTask =
        sourceStatus !== destStatus
          ? { ...movedTask, status: destStatus }
          : movedTask;
      newTasks[sourceStatus] = sourceColumn;

      const destColumn = [...newTasks[destStatus]];
      destColumn.splice(destination.index, 0, updatedMovedTask);
      newTasks[destStatus] = destColumn;

      updatesPayload = [];

      updatesPayload.push({
        $id: updatedMovedTask.id,
        status: destStatus,
        position: Math.min((destination.index + 1) * 1000, 1_000_000),
      });

      newTasks[destStatus].forEach((task, index) => {
        if (task && task.id !== updatedMovedTask.id) {
          const newPosition = Math.min((index + 1) * 1000, 1_000_000);
          if (task.position !== newPosition) {
            updatesPayload.push({
              $id: task.id,
              status: destStatus,
              position: newPosition,
            });
          }
        }
      });
    });
  }, []);

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
