import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(3, "Workspace name must be at least 3 characters long").max(50, "Workspace name must not exceed 50 characters"),
  // description: z.string().optional(), // Optional field
  // ownerId: z.number().positive("Owner ID must be a positive number"), // Example: ID of the workspace creator
});
