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
}

function EditElement({
  id,
  fieldName,
  editElement,
  readElement,
  className,
}: ToggleElementProps) {
  const wrapperId = `${id}-${fieldName}`;
  const { editFieldId, setEditFieldId } = useNodeStore();

  const edited = editFieldId === wrapperId;

  const handleEdited = () => {
    setEditFieldId(wrapperId);
  };

  if (edited) {
    return editElement;
  } else {
    return (
      <button
        className={clsx("text-start", className)}
        onDoubleClick={handleEdited}>
        {readElement}
      </button>
    );
  }
}

export default EditElement;
