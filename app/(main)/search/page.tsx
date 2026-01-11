import { Suspense } from "react";
import SearchField from "./_components/SearchField";
import SearchPlanView from "./_components/SearchPlanView";
import { searchPlans } from "../actions";
import { SearchPageParams } from "./_types/searchParams";
import PlanViewSkelton from "../_components/PlanView/PlanViewSkelton";

export interface SearchPageProps {
  searchParams: Promise<SearchPageParams>; // np: new page, pp: popular page
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const popularPromise = searchPlans("popular", await searchParams);
  const newPromise = searchPlans("new", await searchParams);

  return (
    <main className="flex-1">
      <SearchField />
      <Suspense fallback={<PlanViewSkelton isLoading />}>
        <SearchPlanView
          popularPromise={popularPromise}
          newPromise={newPromise}
        />
      </Suspense>
    </main>
  );
};

export default SearchPage;
