import NodeType from "@/types/node";
import TimeContent from "./TimeContent";
import styles from "./styles.module.css";
import clsx from "clsx";

type MoveNodeProps = NodeType;

function MoveNode({ id }: MoveNodeProps) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={clsx(
          "flex gap-2 items-center text-text-secondary",
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
