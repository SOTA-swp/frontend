import { getPlans } from "../actions";
import SearchField from "./_components/SearchField";
import SearchPlanView from "./_components/SearchPlanView";

export interface SearchPageProps {
  searchPrams: { q?: string };
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchPrams }) => {
  const q = searchPrams?.q || "";

  const popularPlans = await getPlans(q, 0);
  const newPlans = await getPlans(q, 0);

  return (
    <main className="flex-1">
      <SearchField />
      <SearchPlanView
        initialPlans={{
          popularPlans: {
            size: popularPlans.size,
            planData: popularPlans.planData,
          },
          newPlans: {
            size: newPlans.size,
            planData: newPlans.planData,
          },
        }}
      />
    </main>
  );
};

export default SearchPage;
