import { NodeData } from "@/types/node";
import TimeContent from "./TimeContent";
import styles from "./styles.module.css";
import clsx from "clsx";

type MoveNodeProps = NodeData;

function MoveNode({ id }: MoveNodeProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className={clsx(
          "flex gap-2 items-center py-2 pl-3 pr-0 text-text-secondary",
          styles.content
        )}>
        <hr className="flex-1 border-border" />
        <span className="whitespace-nowrap">移動</span>
        <hr className="flex-1 border-border" />
      </div>
      <TimeContent id={id} />
    </div>
  );
}

export default MoveNode;
