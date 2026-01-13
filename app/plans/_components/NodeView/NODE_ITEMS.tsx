import { NODE_TYPES, NodeType } from "@/types/node";
import { ReactNode } from "react";
import { MdDirectionsCar, MdFolderOpen, MdLocationPin } from "react-icons/md";

export interface NodeTypeItem {
  title: string;
  icon: ReactNode;
}

export const NODE_TYPE_ITEMS: Record<NodeType, NodeTypeItem> = {
  [NODE_TYPES.PROCESS]: {
    title: "プロセス",
    icon: <MdFolderOpen />,
  },
  [NODE_TYPES.LOCATION]: {
    title: "ロケーション",
    icon: <MdLocationPin />,
  },
  [NODE_TYPES.MOVE]: {
    title: "移動",
    icon: <MdDirectionsCar />,
  },
} as const;
