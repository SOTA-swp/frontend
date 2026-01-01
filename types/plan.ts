import z from "zod";
import { User } from "./user";

export const PlanSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  title: z
    .string()
    .min(1, "計画名は1文字以上入力してください")
    .max(100, "計画名は100文字以下で入力してください"),
  description: z.string().max(500, "説明は500文字以下で入力してください"),
  isPublic: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// TODO: サムネは？
export type Plan = z.infer<typeof PlanSchema>;

export interface PlanWithDetails {
  planData: Plan & { favorites: number };
  creatorData: User;
}

export const createMockPlan = (num: number = 0): Plan => ({
  id: `mock-plan-id${num}`,
  creatorId: `mock-user-id${num}`,
  title: `モックプランタイトル${num}あああああああああああ`,
  description: `モックプラン${num}の説明文です。ああああああああああああああああああああ`,
  isPublic: num % 2 === 0,
  createdAt: "2025-11-09T12:00:00.000Z",
  updatedAt: "2025-11-09T12:00:00.000Z",
});
