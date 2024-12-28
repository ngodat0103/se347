import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskScema = z.object({
  name: z.string().trim().min(1, "Required"),
  status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  position: z.number().int().min(0, "Required").default(0), //kanban
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});
