import { NodeData } from "@/types/node";
import TimeCell, { TIME_CELL_TYPES } from "./TimeCell";
import { MdKeyboardArrowRight } from "react-icons/md";
import { usePlanStore } from "@/app/plans/_store/hook";

type TimeContentProps = Pick<NodeData, "id">;

function TimeContent({ id }: TimeContentProps) {
  const updateNode = usePlanStore((state) => state.updateNode);
  const startTime = usePlanStore((state) => state.nodes[id].startTime);
  const endTime = usePlanStore((state) => state.nodes[id].endTime);
  const durationMinutes = usePlanStore(
    (state) => state.nodes[id].durationMinutes
  );

  const handleChange = (
    field: keyof Pick<NodeData, "startTime" | "endTime" | "durationMinutes">,
    value: string | number
  ) => {
    if (field === "durationMinutes") {
      updateNode(id, { [field]: Number(value) });
    } else {
      updateNode(id, { [field]: value });
    }
  };

  return (
    <div className="flex gap-8 items-center min-w-[250px] justify-end text-lg pr-4">
      <div className="relative flex gap-2 items-baseline">
        <TimeCell
          type={TIME_CELL_TYPES.START}
          value={startTime}
          onChange={(e) => handleChange("startTime", e.target.value)}
        />
        <MdKeyboardArrowRight className="text-text-secondary" />

        <TimeCell
          type={TIME_CELL_TYPES.END}
          value={endTime}
          onChange={(e) => handleChange("endTime", e.target.value)}
        />
      </div>

      <div className="relative flex items-center gap-2 max-w-[100px]">
        <TimeCell
          type={TIME_CELL_TYPES.DURATION}
          value={durationMinutes}
          onChange={(e) => handleChange("durationMinutes", e.target.value)}
        />
      </div>
    </div>
  );
}

export default TimeContent;
