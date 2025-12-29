import { User } from "./user";

// TODO: サムネは？
export default interface Plan {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

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
