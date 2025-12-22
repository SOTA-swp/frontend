"use client";
import { usePlanStore } from "../../_store/hook";
import AddButton from "../AddButton";
import LocationCard from "./LocationCard";
import ViewWrapper from "../ViewWrapper";
import { createLocation } from "../../_util/createLocation";

function IdeaSpaceViewAddButton() {
  const addLocation = usePlanStore((state) => state.addLocation);

  const handleAddLocation = () => {
    const newLocation = createLocation();
    addLocation(newLocation);
  };
  return <AddButton onClick={handleAddLocation} />;
}

function IdeaSpaceView() {
  const locations = usePlanStore((state) => state.locations);

  return (
    <ViewWrapper
      outerElement={<IdeaSpaceViewAddButton />}
      paper
      overflow="auto">
      <div className="flex gap-4 p-4">
        {Object.keys(locations).map((id) => (
          <div key={id}>
            <LocationCard key={id} id={id} />
          </div>
        ))}
      </div>
    </ViewWrapper>
  );
}

export default IdeaSpaceView;
