import { MdArrowDownward } from "react-icons/md";
import AddNodeBar from "./AddNodeBar";
import clsx from "clsx";
import { NodeData } from "@/types/node";

interface NullBoxProps {
  id: NodeData["id"];
  depth: number;
  isOver?: boolean;
}

function NullBox({ id, depth, isOver = false }: NullBoxProps) {
  return (
    <div
      className={clsx(
        "flex-1 flex flex-col justify-center items-center gap-4 p-6 mr-4 border border-dashed border-text-secondary/50 rounded-md text-center transition-colors",
        isOver && "bg-accent/10"
      )}>
      <div className="flex gap-1 items-baseline text-text-secondary text-sm">
        <p>要素を追加しよう！</p>
        <span>
          <MdArrowDownward />
        </span>
      </div>
      <AddNodeBar parentId={id} order={0} depth={depth} notAnimation />
    </div>
  );
}

export default NullBox;
