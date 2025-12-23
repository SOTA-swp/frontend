"use client";
import { usePlanStore } from "@/app/plans/_store/hook";
import EmojiIcon from "@/components/EmojiIcon";
import LocationDataType from "@/types/location";
import NodeDataType from "@/types/node";
import { getFirstChar, removeEmoji } from "@/utils/removeEmoji";
import { MouseEvent } from "react";

interface LocationSelectorProps {
  nodeId: NodeDataType["id"];
  onClose?: () => void;
}

function LocationSelector({ nodeId, onClose }: LocationSelectorProps) {
  const locations = usePlanStore((state) => state.locations);
  const updateNode = usePlanStore((state) => state.updateNode);

  const handleSelect = (e: MouseEvent, locationId: LocationDataType["id"]) => {
    e.preventDefault();
    updateNode(nodeId, { locationId });
    onClose?.();
    console.log("Selected location:", locationId);
  };

  return (
    <div className="w-xs max-h-[300px] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white mb-2">
        <h4 className="text-lg mb-2">ロケーションを選択</h4>
        <hr className="border-border" />
      </div>
      <div className="flex flex-col gap-1">
        {Object.values(locations).map(({ id, title, address }) => (
          <button key={id} onClick={(e) => handleSelect(e, id)}>
            <div className="flex gap-2 items-center rounded-lg p-2 border border-transparent hover:border-accent hover:bg-accent/20 active:scale-95 transition-all">
              <EmojiIcon>{getFirstChar(title)}</EmojiIcon>
              <div className="text-start min-w-0">
                <p className="truncate">{removeEmoji(title)}</p>
                <p className="text-text-secondary text-sm">〒 {address}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LocationSelector;
