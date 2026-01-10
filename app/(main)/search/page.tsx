import { Suspense } from "react";
import SearchField from "./_components/SearchField";
import SearchPlanView from "./_components/SearchPlanView";

export interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  return (
    <main className="flex-1">
      <Suspense fallback={<div>Loading search view...</div>}>
        <SearchField />
        <SearchPlanView />
      </Suspense>
    </main>
  );
};

export default SearchPage;
