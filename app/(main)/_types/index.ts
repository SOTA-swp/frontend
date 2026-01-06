import { PlanSchema } from "@/types/plan";
import { UserSchema } from "@/types/user";
import z from "zod";

export const AddPlanFormSchema = PlanSchema.pick({
  title: true,
  description: true,
});

export type AddPlanFormData = z.infer<typeof AddPlanFormSchema>;

export const EditUserFormSchema = UserSchema.pick({ username: true });

export type EditUserFormData = z.infer<typeof EditUserFormSchema>;
