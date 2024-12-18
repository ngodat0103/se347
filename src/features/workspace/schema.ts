import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long")
    .max(50, "Workspace name must not exceed 50 characters"),
  imageUrl: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters long")
    .max(50, "Workspace name must not exceed 50 characters"),
  imageUrl: z
    .union([
      z.instanceof(File),
      z
        .string()
        .nullable()
        .transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
