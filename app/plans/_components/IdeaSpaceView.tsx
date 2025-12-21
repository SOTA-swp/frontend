"use client";
import { usePlanStore } from "../_store/hook";
import AddButton from "./AddButton";
import LocationCard from "./LocationCard";
import ViewWrapper from "./ViewWrapper";

function IdeaSpaceViewAddButton() {
  return <AddButton />;
}

function IdeaSpaceView() {
  const locations = usePlanStore((state) => state.locations);

  return (
    <ViewWrapper outerElement={<IdeaSpaceViewAddButton />} paper>
      <div className="flex gap-4">
        {Object.keys(locations).map((id) => (
          <LocationCard key={id} id={id} />
        ))}
      </div>
    </ViewWrapper>
  );
}

export default IdeaSpaceView;
