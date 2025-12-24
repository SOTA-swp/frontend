"use client";
import IconButton from "@/components/IconButton";
import { NODE_TYPE_ITEMS } from "../NODE_ITEMS";
import { motion } from "motion/react";
import NodeDataType, { NodeType } from "@/types/node";
import { usePlanStore } from "@/app/plans/_store/hook";
import { createNode } from "@/app/plans/_util/createNode";

interface AddNodeBarProps {
  parentId: NodeDataType["id"];
  order: number;
  notAnimation?: boolean;
}

function AddNodeBar({
  parentId,
  order,
  notAnimation = false,
}: AddNodeBarProps) {
  const addNode = usePlanStore((state) => state.addNode);

  const handleAddNode = (type: NodeType) => {
    const newNode = createNode(type);
    addNode(newNode, parentId, order);
  };

  return (
    <motion.div
      animate={notAnimation ? "open" : "close"}
      whileHover={"open"}
      variants={{ close: { opacity: 0 }, open: { opacity: 1 } }}
      className="relative pr-2 h-3 flex items-center justify-center">
      {!notAnimation && (
        <motion.hr
          variants={{
            close: { width: 0 },
            open: {
              width: "100%",
            },
          }}
          className="border-primary absolute left-0"
        />
      )}

      <motion.div
        variants={{
          open: { transition: { staggerChildren: 0.05 } },
          close: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
        className="absolute flex gap-6">
        {Object.entries(NODE_TYPE_ITEMS).map(([type, { title, icon }]) => (
          <motion.div
            key={type}
            variants={{
              close: { opacity: 0, x: -20, rotate: -90 },
              open: { opacity: 1, x: 0, rotate: 0 },
            }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}>
            <IconButton
              onClick={() => handleAddNode(type as NodeType)}
              title={`${title}を追加`}
              icon={icon}
              color={notAnimation ? "gray" : "primary"}
              variant={notAnimation ? "outline" : "contain"}
              size={"sm"}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default AddNodeBar;
