import { PlanSchema } from "@/types/plan";
import z from "zod";

export const EditPlanFormSchema = PlanSchema.pick({
  title: true,
  description: true,
  isPublic: true,
});

export type EditPlanFormData = z.infer<typeof EditPlanFormSchema>;
