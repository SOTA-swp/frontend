"use client";

import NodeType from "@/types/node";
import { useNodeStore } from "../../_store/nodeStore";
import { useShallow } from "zustand/shallow";
import EditElement from "./EditElement";
import FIELD_NAMES from "./FIELD_NAMES";
import TextField from "@/components/TextField";
import Node from "./Node";
import TimeContent from "./TimeContent";
import IconButton from "@/components/IconButton";
import { MdArrowDropDown } from "react-icons/md";

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
        <div className="w-[300px] flex items-center gap-1 self-end">
          <IconButton
            icon={<MdArrowDropDown />}
            variant={"iconOnly"}
            color={"gray"}
            size={"sm"}
          />
          <div className="flex items-center bg-primary px-4 py-2 rounded-t-lg ">
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
              readElement={
                <p className="min-h-4 min-w-4 max-w-[250px] text-paper truncate">
                  {name}
                </p>
              }
            />
          </div>
        </div>
        <TimeContent id={id} {...props} />
      </div>
      <div className="flex flex-col gap-2 p-4 border border-primary bg-paper rounded-xl">
        {childrenNodes?.map((childId) => (
          <Node key={childId} id={childId} />
        ))}
      </div>
    </div>
  );
}

export default ProcessNode;
