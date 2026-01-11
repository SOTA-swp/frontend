import Chip from "@/components/Chip";
import PlanCard from "@/app/(main)/_components/PlanCard";
import { getRecommendedPlans } from "../actions";
import { PlanWithDetails } from "@/types/plan";

async function Top() {
  let plans: PlanWithDetails[] = [];
  try {
    plans = (await getRecommendedPlans()).plans;
  } catch (e) {
    console.error("Failed to fetch recommended plans:", e);
    return null;
  }

  return (
    <div className="relative flex flex-col py-3">
      <span className="relative flex ml-4 -mb-4 z-10">
        <Chip color={"accent"} size={"sm"}>
          オススメ！
        </Chip>
      </span>
      <div className="grid grid-flow-col auto-cols-[150px] gap-4 px-4 pt-8 pb-4 bg-primary/10 inset-shadow-sm overflow-x-auto">
        {plans.map((plan) => {
          const wrapId = `top-${plan.planData.id}`;
          return (
            <PlanCard
              key={wrapId}
              variant="mini"
              data={plan}
              layoutId={"top"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Top;
