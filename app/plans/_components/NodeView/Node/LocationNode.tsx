"use client";
import EmojiIcon from "@/components/EmojiIcon";
import NodeDataType from "@/types/node";
import TimeContent from "./TimeContent";
import EditElement from "./EditElement";
import FIELD_NAMES from "./FIELD_NAMES";
import TextField from "@/components/TextField";
import { getFirstChar, removeEmoji } from "@/utils/removeEmoji";
import clsx from "clsx";
import styles from "./styles.module.css";
import { usePlanStore } from "../../../_store/hook";

type LocationNodeProps = NodeDataType;

function LocationNode({ id, locationId, name }: LocationNodeProps) {
  const updateNode = usePlanStore((state) => state.updateNode);
  const location = usePlanStore((state) => state.locations[locationId]);

  const handleNameChange = (value: string) => {
    updateNode(id, { name: value });
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className={clsx("flex items-center gap-2 min-w-0", styles.content)}
        title={name}>
        <EmojiIcon size={"lg"}>
          {getFirstChar(name || location.title)}
        </EmojiIcon>
        <div className="flex flex-col flex-1 min-w-0">
          <EditElement
            id={id}
            fieldName={FIELD_NAMES.NAME}
            editElement={
              <TextField
                label="プロセス名"
                value={name}
                placeholder={location.title}
                onChange={(e) => handleNameChange(e.target.value)}
                fullWidth
                className="field-sizing-fixed"
              />
            }
            readElement={
              <p className="truncate min-h-4 min-w-4">
                {removeEmoji(name || location.title)}
              </p>
            }
            position="absolute"
            className="min-w-0"
          />
          <p className="text-text-secondary text-[14px] truncate leading-none">
            {location.title}
          </p>
        </div>
      </div>
      <TimeContent id={id} />
    </div>
  );
}

export default LocationNode;
