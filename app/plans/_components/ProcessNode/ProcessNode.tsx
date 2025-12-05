"use client";

import NodeType from "@/types/node";
import { useNodeStore } from "../../_store/nodeStore";
import { useShallow } from "zustand/shallow";
import EditElement from "./EditElement";
import FIELD_NAMES from "./FIELD_NAMES";
import TextField from "@/components/TextField";
import Node from "./Node";
import TimeContent from "./TimeContent";

type ProcessNodeProps = NodeType;

function ProcessNode({ id, name, ...props }: ProcessNodeProps) {
  const { updateNode } = useNodeStore();

  const childrenNodes = useNodeStore(
    useShallow((state) =>
      Object.values(state.nodes)
        .filter((n) => n.parentId === id)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((n) => n.id)
    )
  );

  const handleNameChange = (value: string) => {
    updateNode(id, { name: value });
  };

  return (
    <div>
      <div className="flex gap-8 items-center">
        <div className="min-w-[300px]">
          <EditElement
            id={id}
            fieldName={FIELD_NAMES.NAME}
            editElement={
              <TextField
                label="プロセス名"
                value={name}
                fullWidth
                onChange={(e) => handleNameChange(e.target.value)}
              />
            }
            readElement={name}
          />
        </div>
        <TimeContent id={id} {...props} />
      </div>
      <div>
        {childrenNodes?.map((childId) => (
          <Node key={childId} id={childId} />
        ))}
      </div>
    </div>
  );
}

export default ProcessNode;
