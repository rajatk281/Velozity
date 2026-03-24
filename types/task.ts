import { z } from "zod";

export const AssigneeSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title too short"),
  status: z.enum(["todo", "in-progress", "review", "done"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  assignees: z.array(AssigneeSchema),
  dueDate: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;