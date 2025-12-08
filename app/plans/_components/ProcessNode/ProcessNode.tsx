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
import clsx from "clsx";
import styles from "./styles.module.css";
import { motion } from "motion/react";

interface ProcessNodeProps extends NodeType {
  depth?: number;
}

function ProcessNode({ id, name, depth = 0, ...props }: ProcessNodeProps) {
  const { updateNode, openNode, closeNode } = useNodeStore();
  const open = !useNodeStore((state) => state.closeNodeIds.includes(id));

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

  const handleClose = () => {
    closeNode(id);
  };

  const handleOpen = () => {
    openNode(id);
  };

  return (
    <div>
      <div className={"flex gap-4 items-center justify-between"}>
        <div
          className={clsx("flex items-center gap-1 self-end", styles.content)}
          title={name}>
          <IconButton
            onClick={open ? handleClose : handleOpen}
            icon={
              <span
                className={clsx("transition-transform", !open && "-rotate-90")}>
                <MdArrowDropDown />
              </span>
            }
            variant={"iconOnly"}
            color={"gray"}
            size={"sm"}
          />
          <div
            className={clsx(
              "flex min-w-0 items-center bg-primary px-4 py-2 rounded-t-lg",
              !open && "rounded-b-lg"
            )}>
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
                <p className="min-h-4 min-w-4 text-paper truncate">{name}</p>
              }
              className="min-w-0"
            />
          </div>
        </div>
        <TimeContent id={id} {...props} />
      </div>
      <motion.div
        initial={false}
        animate={{
          height: open ? "" : 0,
          opacity: open ? 1 : 0,
          overflow: open ? "visible" : "hidden",
        }}
        className={clsx(
          "border border-primary bg-paper rounded-xl",
          depth !== 0 && "rounded-r-none border-r-0"
        )}>
        <div className="flex flex-col gap-2 p-4 pr-0">
          {childrenNodes?.map((childId) => (
            <Node key={childId} id={childId} depth={depth + 1} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ProcessNode;
