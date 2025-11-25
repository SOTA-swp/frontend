"use client";

import {
  MdAutoAwesome,
  MdExpandMore,
  MdLocalFireDepartment,
} from "react-icons/md";
import PlanBlock from "../../_components/PlanBlock";
import { useState } from "react";
import { PlanWithDetailsType } from "@/types/plan";
import PlanCard from "@/components/PlanCard";
import CommonButton from "@/components/CommonButton";
import { getPlans } from "../../actions";
import { useSearchParams } from "next/navigation";
import { PLAN_LIMIT } from "../../_consts/PLAN_LIMIT";

function MoreButton({
  maxSize,
  currentSize,
  onClick,
}: {
  maxSize: number;
  currentSize: number;
  onClick?: () => void;
}) {
  return currentSize < maxSize ? (
    <CommonButton
      onClick={onClick}
      title="もっと見る"
      variant="text"
      icon={<MdExpandMore />}>
      もっと見る
    </CommonButton>
  ) : null;
}

function SearchPlanView({
  initialPlans,
}: {
  initialPlans: {
    popularPlans: { size: number; planData: PlanWithDetailsType[] };
    newPlans: { size: number; planData: PlanWithDetailsType[] };
  };
}) {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const [popularPlans, setPopularPlans] = useState(
    initialPlans ? initialPlans.popularPlans.planData : []
  );
  const [newPlans, setNewPlans] = useState(
    initialPlans ? initialPlans.newPlans.planData : []
  );

  const handleLoadingMorePopular = async () => {
    const morePlans = await getPlans(q, popularPlans.length / PLAN_LIMIT);
    setPopularPlans((prev) => [...prev, ...morePlans.planData]);
  };

  const handleLoadingMoreNew = async () => {
    const morePlans = await getPlans(q, newPlans.length / PLAN_LIMIT);
    setNewPlans((prev) => [...prev, ...morePlans.planData]);
  };

  return (
    <section className="mt-16 flex flex-col gap-16">
      <PlanBlock
        icon={<MdLocalFireDepartment />}
        title="人気"
        moreButton={
          <MoreButton
            maxSize={initialPlans.popularPlans.size || 0}
            currentSize={popularPlans.length}
            onClick={handleLoadingMorePopular}
          />
        }>
        {popularPlans.map((plan) => (
          <PlanCard
            key={plan.planData.id}
            data={plan}
            layoutId="search-popular"
          />
        ))}
      </PlanBlock>

      <PlanBlock
        icon={<MdAutoAwesome />}
        title="新着"
        moreButton={
          <MoreButton
            maxSize={initialPlans.newPlans.size || 0}
            currentSize={newPlans.length}
            onClick={handleLoadingMoreNew}
          />
        }>
        {newPlans.map((plan) => (
          <PlanCard key={plan.planData.id} data={plan} layoutId="search-new" />
        ))}
      </PlanBlock>
    </section>
  );
}

export default SearchPlanView;
