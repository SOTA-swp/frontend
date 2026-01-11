"use client";

import { NodeData } from "@/types/node";
import EditElement from "./EditElement";
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
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { usePlanStore } from "../../../_store/hook";
import { useInlineEdit } from "@/app/plans/_hooks/useInlineEdit";
import NullBox from "../NullBox";
import { useState } from "react";
import { MAX_DEPTH } from "@/app/plans/_consts/node";

interface ProcessNodeProps extends NodeData {
  depth?: number;
}

function ProcessNode({ id, name, depth = 0, ...props }: ProcessNodeProps) {
  const updateNode = usePlanStore((state) => state.updateNode);
  const closeNode = usePlanStore((state) => state.closeNode);
  const openNode = usePlanStore((state) => state.openNode);
  const open = !usePlanStore((state) => state.closeNodeIds.includes(id));
  const childrenNodes = usePlanStore((state) => state.structure[id]) || [];
  const { isEditing, handleOnEditing, inlineEditInputHandlers } =
    useInlineEdit();

  const noneChildren = childrenNodes.length === 0;
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  // 自分自身へのドロップを無効化
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `container-${id}`,
    data: { id, type: "process" },
    disabled: draggedNodeId === id,
  });

  useDndMonitor({
    onDragStart(event) {
      const nodeId = event.active?.data?.current?.id;
      if (nodeId) setDraggedNodeId(String(nodeId));
    },
    onDragEnd() {
      setDraggedNodeId(null);
    },
    onDragCancel() {
      setDraggedNodeId(null);
    },
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
              isEditing={isEditing}
              onClick={handleOnEditing}
              editElement={
                <TextField
                  label="プロセス名"
                  value={name}
                  fullWidth
                  onChange={(e) => handleNameChange(e.target.value)}
                  {...inlineEditInputHandlers}
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
            depth !== 1 && "rounded-r-none border-r-0"
          )}>
          <SortableContext
            items={childrenNodes}
            strategy={verticalListSortingStrategy}
            disabled={!open}>
            <div className="flex flex-col p-4 pr-0 ">
              {depth > MAX_DEPTH ? (
                <p className="text-error p-2">最大深度を超えています！</p>
              ) : (
                <>
                  {noneChildren && (
                    <NullBox id={id} isOver={isOver} depth={depth + 1} />
                  )}
                  {childrenNodes?.map((childId, i) => (
                    <Node
                      key={childId}
                      id={childId}
                      parentId={id}
                      order={i}
                      depth={depth + 1}
                      isLast={i === childrenNodes.length - 1}
                    />
                  ))}
                </>
              )}
            </div>
          </SortableContext>
        </motion.div>
      </div>
    </div>
  );
}

export default ProcessNode;
