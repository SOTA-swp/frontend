import { getPlans } from "../actions";
import SearchField from "./_components/SearchField";
import SearchPlanView from "./_components/SearchPlanView";

export interface SearchPageProps {
  searchPrams: { q?: string };
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchPrams }) => {
  const q = searchPrams?.q || "";

  return (
    <main className="flex-1">
      <SearchField />
      <SearchPlanView
        initialPlans={{
          popularPlans: await getPlans(q, 0),
          newPlans: await getPlans(q, 0),
        }}
      />
    </main>
  );
};

export default SearchPage;
