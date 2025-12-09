"use client";

import NodeType from "@/types/node";
import FIELD_NAMES from "./FIELD_NAMES";
import { useNodeStore } from "../../_store/nodeStore";
import clsx from "clsx";

interface ToggleElementProps {
  id: NodeType["id"];
  fieldName: (typeof FIELD_NAMES)[keyof typeof FIELD_NAMES];
  editElement: React.ReactNode;
  readElement: React.ReactNode;
  className?: string;
  position?: "inline" | "absolute";
}

function EditElement({
  id,
  fieldName,
  editElement,
  readElement,
  className,
  position = "inline",
}: ToggleElementProps) {
  const wrapperId = `${id}-${fieldName}`;
  const { editFieldId, setEditFieldId } = useNodeStore();

  const edited = editFieldId === wrapperId;

  const handleEdited = () => {
    setEditFieldId(wrapperId);
  };

  if (edited) {
    return (
      <div className="relative flex items-center">
        {position === "absolute" && (
          <span className="opacity-0">{readElement}</span>
        )}
        <span
          className={clsx(
            "z-10",
            position === "absolute" && "absolute left-0"
          )}>
          {editElement}
        </span>
      </div>
    );
  } else {
    return (
      <button className={clsx("text-start", className)} onClick={handleEdited}>
        {readElement}
      </button>
    );
  }
}

export default EditElement;
