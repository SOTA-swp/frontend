"use client";
import { VIEW_MODE } from "@/app/plans/_consts/viewMode";
import { usePlanStore } from "@/app/plans/_store/hook";
import CommonButton from "@/components/CommonButton";
import EmojiIcon from "@/components/EmojiIcon";
import { LocationData } from "@/types/location";
import { NodeData } from "@/types/node";
import { getFirstChar, removeEmoji } from "@/utils/removeEmoji";
import { MouseEvent } from "react";

interface LocationSelectorProps {
  nodeId: NodeData["id"];
  onClose?: () => void;
}

function LocationSelector({ nodeId, onClose }: LocationSelectorProps) {
  const locations = usePlanStore((state) => state.locations);
  const updateNode = usePlanStore((state) => state.updateNode);
  const setViewMode = usePlanStore((state) => state.setViewMode);

  const handleSelect = (e: MouseEvent, locationId: LocationData["id"]) => {
    e.preventDefault();
    updateNode(nodeId, { locationId });
    onClose?.();
  };

  const handleMoveToIdeaSpace = () => {
    setViewMode(VIEW_MODE.IDEA_SPACE);
    onClose?.();
  };

  return (
    <div className="w-xs max-h-75 overflow-y-auto bg-paper p-4 rounded-lg shadow-md">
      <div className="sticky top-0 z-10 bg-paper mb-2">
        <h4 className="text-lg mb-2">ロケーションを選択</h4>
        <hr className="border-border" />
      </div>
      <div className="flex flex-col gap-1">
        {Object.keys(locations).length === 0 && (
          <>
            <div className="text-sm text-text-secondary grid gap-1 py-2">
              <p>利用可能なロケーションがありません！</p>
              <p>
                アイデアスペースからロケーションを追加するか、検索をしてロケーションを追加してください！
              </p>
            </div>
            <CommonButton variant={"outline"} onClick={handleMoveToIdeaSpace}>
              アイデアスペースへ移動
            </CommonButton>
          </>
        )}
        {Object.values(locations).map(({ id, title, address }) => (
          <button key={id} onClick={(e) => handleSelect(e, id)}>
            <div className="flex gap-2 items-center rounded-lg p-2 border border-transparent hover:border-accent hover:bg-accent/20 active:scale-95 transition-all">
              <EmojiIcon>{getFirstChar(title)}</EmojiIcon>
              <div className="text-start min-w-0">
                <p className="truncate">{removeEmoji(title)}</p>
                <p className="text-text-secondary text-sm truncate">
                  {address}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LocationSelector;
