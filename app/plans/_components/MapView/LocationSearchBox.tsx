import TextField from "@/components/TextField";
import {
  LocationSearchResult,
  useLocationSearch,
} from "../../_hooks/useLocationSearch";
import { usePlanStore } from "../../_store/hook";
import { createLocation } from "../../_util/createLocation";
import { scrollToBottom } from "@/utils/scroll";
import { NODE_VIEW_ID } from "../NodeView";
import { createNode } from "../../_util/createNode";
import { NODE_TYPES } from "@/types/node";
import { toast } from "sonner";

function LocationSearchBox() {
  const addLocation = usePlanStore((state) => state.addLocation);
  const addNode = usePlanStore((state) => state.addNode);
  const isReadOnly = usePlanStore((state) => state.isReadOnly);

  const handleAddLocation = (result: LocationSearchResult) => {
    try {
      if (isReadOnly) return;
      const newLocation = createLocation({
        title: result.name,
        address: result.address,
        lat: result.lat,
        lng: result.lng,
      });
      const newLocationNode = createNode(NODE_TYPES.LOCATION, {
        locationId: newLocation.id,
      });
      addLocation(newLocation);
      addNode(newLocationNode);
      scrollToBottom(NODE_VIEW_ID);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const { inputRef } = useLocationSearch(handleAddLocation);

  return (
    <div className="absolute top-0 left-0 w-full p-2 pt-4">
      <TextField
        label="検索"
        ref={inputRef}
        fullWidth
        disabled={isReadOnly}
        placeholder={
          isReadOnly
            ? "閲覧モードでは編集できません"
            : "場所を検索してタイムラインに追加"
        }
      />
    </div>
  );
}

export default LocationSearchBox;
