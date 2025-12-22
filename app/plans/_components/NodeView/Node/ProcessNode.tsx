"use client";

import NodeDataType from "@/types/node";
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
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { usePlanStore } from "../../../_store/hook";

interface ProcessNodeProps extends NodeDataType {
  depth?: number;
}

function ProcessNode({ id, name, depth = 0, ...props }: ProcessNodeProps) {
  const updateNode = usePlanStore((state) => state.updateNode);
  const closeNode = usePlanStore((state) => state.closeNode);
  const openNode = usePlanStore((state) => state.openNode);
  const open = !usePlanStore((state) => state.closeNodeIds.includes(id));
  const childrenNodes = usePlanStore((state) => state.structure[id]) || [];

  const noneChildren = childrenNodes.length === 0;

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `container-${id}`,
    data: { id, type: "process" },
  });

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
      <div ref={noneChildren ? setDroppableRef : undefined}>
        <motion.div
          initial={false}
          animate={{
            height: open ? "" : 0,
            opacity: open ? 1 : 0,
            overflow: open ? "visible" : "clip",
          }}
          className={clsx(
            "border border-primary rounded-xl bg-paper",
            depth !== 0 && "rounded-r-none border-r-0"
          )}>
          <SortableContext
            items={childrenNodes}
            strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2 p-4 pr-0 ">
              {noneChildren && (
                <div
                  className={clsx(
                    "p-3 mr-3 border border-dashed border-text-secondary/50 rounded-md text-center transition-colors",
                    isOver ? "bg-accent/10" : "bg-paper"
                  )}>
                  <p className="text-text-secondary text-sm">
                    要素を追加しよう！
                  </p>
                </div>
              )}
              {childrenNodes?.map((childId) => (
                <Node key={childId} id={childId} depth={depth + 1} />
              ))}
            </div>
          </SortableContext>
        </motion.div>
      </div>
    </div>
  );
}

export default ProcessNode;
