import NodeType from "@/types/node";
import TimeContent from "./TimeContent";

type MoveNodeProps = NodeType;

function MoveNode({ id }: MoveNodeProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 flex gap-2 items-center text-text-secondary">
        <hr className="flex-1 border-border" />
        <span>移動</span>
        <hr className="flex-1 border-border" />
      </div>
      <TimeContent id={id} />
    </div>
  );
}

export default MoveNode;
