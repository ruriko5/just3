import { z } from "zod";

const titleMin = 2;
const titleMax = 256;
export const descMax = 1024;

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(titleMin, `Title must be at least ${titleMin} characters.`)
    .max(titleMax, `Title must be at most ${titleMax} characters.`),
  description: z
    .string()
    .trim()
    .max(descMax, `Description must be at most ${descMax} characters.`),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
