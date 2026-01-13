import { PlanRole } from "@/consts/PLAN_ROLE";
import { User } from "./user";

export type Member = Pick<User, "id" | "username"> & { role: PlanRole };
