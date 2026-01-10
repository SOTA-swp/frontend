"use client";

import {
  MdAutoAwesome,
  MdExpandMore,
  MdLocalFireDepartment,
} from "react-icons/md";
import PlanBlock from "../../_components/PlanBlock";
import { useEffect, useState } from "react";
import { PlanWithDetails } from "@/types/plan";
import PlanCard from "@/app/(main)/_components/PlanCard";
import CommonButton from "@/components/CommonButton";
import { useSearchParams } from "next/navigation";
import { Pagination } from "../_types/pagination";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { SEARCH_LIMIT } from "../../_consts/PLAN_LIMIT";
import { formatPlanData } from "../../_util/formatPlanData";

interface SearchResults {
  plans: PlanWithDetails[];
  pagination: Pagination;
}

export const searchPlans = async (
  q: string,
  page: number,
  sort: "popular" | "new" = "popular",
  limit: number = SEARCH_LIMIT
): Promise<SearchResults> => {
  const isSever = typeof window === "undefined";

  const params = new URLSearchParams({
    q,
    page: page.toString(),
    limit: limit.toString(),
    sort,
  }).toString();
  const res = await fetchWrapper.get(
    `${ApiRoutes.plan.create}?${params}`,
    isSever,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch plan info");
  }
  const data = await res.json();
  const { plans, pagination } = data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatPlans = plans.map((plan: any) => formatPlanData(plan));
  const planData = await Promise.all(formatPlans);
  console.log(planData);
  return { plans: planData, pagination };
};

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

function SearchPlanView() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const [popularPlansPagination, setPopularPlansPagination] =
    useState<Pagination | null>(null);
  const [newPlansPagination, setNewPlansPagination] =
    useState<Pagination | null>(null);

  const [popularPlans, setPopularPlans] = useState<PlanWithDetails[]>([]);
  const [newPlans, setNewPlans] = useState<PlanWithDetails[]>([]);

  const handleLoadingMorePopular = async () => {
    if (!popularPlansPagination) return;
    const { page: currentPage } = popularPlansPagination;
    const res = await searchPlans(q, currentPage + 1, "popular");
    setPopularPlansPagination(res.pagination);
    setPopularPlans((prev) => [...prev, ...res.plans]);
  };

  const handleLoadingMoreNew = async () => {
    if (!newPlansPagination) return;
    const { page: currentPage } = newPlansPagination;
    const res = await searchPlans(q, currentPage + 1, "new");
    setNewPlansPagination(res.pagination);
    setNewPlans((prev) => [...prev, ...res.plans]);
  };

  useEffect(() => {
    const fetchInitialPlans = async () => {
      const popularRes = await searchPlans(q, 0, "popular");
      const newRes = await searchPlans(q, 0, "new");
      setPopularPlans(popularRes.plans);
      setPopularPlansPagination(popularRes.pagination);
      setNewPlans(newRes.plans);
      setNewPlansPagination(newRes.pagination);
    };
    fetchInitialPlans();
  }, [q]);

  return (
    <section className="mt-16 flex flex-col gap-16">
      <PlanBlock
        icon={<MdLocalFireDepartment />}
        title="人気"
        moreButton={
          <MoreButton
            maxSize={popularPlansPagination?.total || 0}
            currentSize={popularPlans.length}
            onClick={handleLoadingMorePopular}
          />
        }>
        {popularPlans.map((plan) => {
          return (
            <PlanCard
              key={plan.planData.id}
              data={plan}
              layoutId="search-popular"
            />
          );
        })}
      </PlanBlock>

      <PlanBlock
        icon={<MdAutoAwesome />}
        title="新着"
        moreButton={
          <MoreButton
            maxSize={newPlansPagination?.total || 0}
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
