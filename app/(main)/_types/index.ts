import { PlanSchema } from "@/types/plan";
import z from "zod";

export const AddPlanFormSchema = PlanSchema.pick({
  title: true,
  description: true,
});

export type AddPlanFormData = z.infer<typeof AddPlanFormSchema>;
