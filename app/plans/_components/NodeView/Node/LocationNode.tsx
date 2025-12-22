"use client";
import EmojiIcon from "@/components/EmojiIcon";
import NodeDataType from "@/types/node";
import TimeContent from "./TimeContent";
import EditElement from "./EditElement";
import TextField from "@/components/TextField";
import { getFirstChar, removeEmoji } from "@/utils/removeEmoji";
import clsx from "clsx";
import styles from "./styles.module.css";
import { usePlanStore } from "../../../_store/hook";
import { useInlineEdit } from "@/app/plans/_hooks/useInlineEdit";

type LocationNodeProps = NodeDataType;

function LocationNode({ id, locationId, name }: LocationNodeProps) {
  const updateNode = usePlanStore((state) => state.updateNode);
  const location = usePlanStore((state) => state.locations[locationId]);
  const { isEditing, handleOnEditing, inlineEditInputHandlers } =
    useInlineEdit();

  const handleNameChange = (value: string) => {
    updateNode(id, { name: value });
  };

  const isLocationMissing = !location;
  const title = isLocationMissing
    ? "❗️ロケーションが見つかりません"
    : location.title;

  return (
    <div className="flex items-center justify-between">
      <div
        className={clsx("flex items-center gap-2 min-w-0", styles.content)}
        title={name}>
        <EmojiIcon size={"lg"} color={isLocationMissing ? "error" : "primary"}>
          {getFirstChar(name || title)}
        </EmojiIcon>
        <div className="flex flex-col flex-1 min-w-0">
          <EditElement
            isEditing={isEditing}
            onClick={handleOnEditing}
            editElement={
              <TextField
                label="プロセス名"
                value={name}
                placeholder={title}
                onChange={(e) => handleNameChange(e.target.value)}
                fullWidth
                className="field-sizing-fixed"
                {...inlineEditInputHandlers}
              />
            }
            readElement={
              <p className="truncate min-h-4 min-w-4">
                {removeEmoji(name || title)}
              </p>
            }
            position="absolute"
            className="min-w-0"
          />
          <p
            className={clsx(
              " text-[14px] truncate leading-none",
              isLocationMissing ? "text-error" : "text-text-secondary"
            )}>
            {title}
          </p>
        </div>
      </div>
      <TimeContent id={id} />
    </div>
  );
}

export default LocationNode;
