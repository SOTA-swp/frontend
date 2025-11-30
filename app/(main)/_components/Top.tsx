"use client";
import Chip from "@/components/Chip";
import PlanCard from "@/components/PlanCard";
import { PlanWithDetailsType } from "@/types/plan";
import { useOpenPlanCard } from "../_store/openPlanCardStore";

function Top({ data }: { data: PlanWithDetailsType[] }) {
  const { openPlanCardId, setOpenPlanCardId } = useOpenPlanCard();

  return (
    <div className="relative flex flex-col py-3">
      <span className="relative flex ml-4 -mb-4 z-10">
        <Chip color={"accent"}>オススメ！</Chip>
      </span>
      <div className="flex gap-4 px-4 pt-8 pb-4 bg-primary/10 inset-shadow-sm overflow-x-auto">
        {data.map((plan) => {
          const wrapId = `top-${plan.planData.id}`;

          return (
            <span key={wrapId} className="shrink-0">
              <PlanCard
                open={openPlanCardId === wrapId}
                onOpen={() => setOpenPlanCardId(wrapId)}
                onClose={() => setOpenPlanCardId(null)}
                variant="mini"
                data={plan}
                layoutId={"top"}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Top;
