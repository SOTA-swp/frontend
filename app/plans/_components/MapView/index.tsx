"use client";
import { ControlPosition, Map } from "@vis.gl/react-google-maps";
import ViewWrapper from "../ViewWrapper";
import {
  LocationSearchResult,
  useLocationSearch,
} from "../../_hooks/useLocationSearch";
import { usePlanStore } from "../../_store/hook";
import { createLocation } from "../../_util/createLocation";
import TextField from "@/components/TextField";

function LocationSearchBox() {
  const addLocation = usePlanStore((state) => state.addLocation);

  const handleAddLocation = (result: LocationSearchResult) => {
    const newLocation = createLocation({
      title: result.name,
      address: result.address,
      lat: result.lat,
      lng: result.lng,
    });
    addLocation(newLocation);
  };

  const { inputRef } = useLocationSearch(handleAddLocation);

  return (
    <div className="absolute top-0 left-0 w-full p-2 pt-4">
      <TextField
        label="検索"
        ref={inputRef}
        fullWidth
        placeholder="場所を検索してタイムラインに追加"
      />
    </div>
  );
}

function MapView() {
  const position = { lat: 35.681236, lng: 139.767125 }; // 東京駅の座標
  return (
    <ViewWrapper paper outerElement={<LocationSearchBox />}>
      <Map
        defaultCenter={position}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
        mapTypeControlOptions={{ position: ControlPosition.BOTTOM_LEFT }}
        mapId={null}
      />
    </ViewWrapper>
  );
}

export default MapView;
