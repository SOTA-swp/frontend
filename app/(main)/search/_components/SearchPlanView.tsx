"use client";

import {
  MdAutoAwesome,
  MdExpandMore,
  MdLocalFireDepartment,
} from "react-icons/md";
import PlanBlock from "../../_components/PlanBlock";
import PlanCard from "@/app/(main)/_components/PlanCard";
import CommonButton from "@/components/CommonButton";
import EmptyState from "@/components/EmptyState";
import { use } from "react";
import { SearchResults } from "../../actions";
import { useRouter, useSearchParams } from "next/navigation";
import PATH from "@/consts/PATH";

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
      variant="outline"
      icon={<MdExpandMore />}>
      もっと見る
    </CommonButton>
  ) : null;
}

interface SearchPlanViewProps {
  popularPromise: Promise<SearchResults>;
  newPromise: Promise<SearchResults>;
}

function SearchPlanView({ popularPromise, newPromise }: SearchPlanViewProps) {
  const popularData = use(popularPromise);
  const newData = use(newPromise);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLoading = (type: "popular" | "new") => {
    const query = type === "popular" ? "pp" : "np";
    const currentPage = parseInt(searchParams.get(query) || "0", 10);
    const params = new URLSearchParams(searchParams.toString());
    params.set(query, (currentPage + 1).toString());
    router.push(`${PATH.SEARCH}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="mt-16 flex flex-col gap-16">
      <PlanBlock
        icon={<MdLocalFireDepartment />}
        title="人気"
        moreButton={
          <MoreButton
            maxSize={popularData.pagination.total}
            currentSize={popularData.plans.length}
            onClick={() => handleLoading("popular")}
          />
        }>
        {popularData.plans.map((plan) => (
          <PlanCard
            key={plan.planData.id}
            data={plan}
            layoutId="search-popular"
          />
        ))}
        {popularData.plans.length === 0 && (
          <EmptyState title="人気の計画が見つかりませんでした" />
        )}
      </PlanBlock>

      <PlanBlock
        icon={<MdAutoAwesome />}
        title="新着"
        moreButton={
          <MoreButton
            maxSize={popularData.pagination.total}
            currentSize={newData.plans.length}
            onClick={() => handleLoading("new")}
          />
        }>
        {newData.plans.map((plan) => (
          <PlanCard key={plan.planData.id} data={plan} layoutId="search-new" />
        ))}
        {newData.plans.length === 0 && (
          <EmptyState title="新着の計画が見つかりませんでした" />
        )}
      </PlanBlock>
    </section>
  );
}

export default SearchPlanView;
