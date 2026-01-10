import { PlanRole } from "@/consts/PLAN_ROLE";
import { Plan, PlanWithDetails } from "@/types/plan";
import { User } from "@/types/user";

/**
 * APIなどから取得したプランデータを整形する
 *
 * @param data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatPlanData = async (data: any): Promise<PlanWithDetails> => {
  const plans: Plan & {
    role: PlanRole;
    creator: Pick<User, "id" | "username">;
    _count: { members: number; likes: number };
    hasLiked: boolean;
  } = data;

  return {
    planData: {
      ...plans,
      favorites: plans._count.likes,
      hasLiked: plans.hasLiked,
      role: plans.role,
    },
    creatorData: {
      id: plans.creator.id,
      username: plans.creator.username,
      email: "",
    },
  };
};
