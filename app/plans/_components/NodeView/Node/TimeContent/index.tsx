import NodeDataType from "@/types/node";
import EditElement from "../EditElement";
import FIELD_NAMES from "../FIELD_NAMES";
import TextField from "@/components/TextField";
import TimeCell from "./TimeCell";
import { MdKeyboardArrowRight } from "react-icons/md";
import { usePlanStore } from "@/app/plans/_store/hook";

type TimeContentProps = Pick<NodeDataType, "id">;

function TimeContent({ id }: TimeContentProps) {
  const updateNode = usePlanStore((state) => state.updateNode);
  const startTime = usePlanStore((state) => state.nodes[id].startTime);
  const endTime = usePlanStore((state) => state.nodes[id].endTime);
  const durationMinutes = usePlanStore(
    (state) => state.nodes[id].durationMinutes
  );

  const handleChange = (
    field: keyof Pick<
      NodeDataType,
      "startTime" | "endTime" | "durationMinutes"
    >,
    value: string | number
  ) => {
    updateNode(id, { [field]: value });
  };

  return (
    <div className="flex gap-8 items-center min-w-[250px] justify-end text-lg pr-4">
      <div className="relative flex gap-2 items-baseline">
        <EditElement
          id={id}
          fieldName={FIELD_NAMES.START_TIME}
          editElement={
            <TextField
              type="time"
              value={startTime}
              label="開始時刻"
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
          }
          readElement={<TimeCell type="start">{startTime}</TimeCell>}
          position="absolute"
        />
        <MdKeyboardArrowRight className="text-text-secondary" />
        <EditElement
          id={id}
          fieldName={FIELD_NAMES.END_TIME}
          editElement={
            <TextField
              type="time"
              value={endTime}
              label="終了時刻"
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          }
          readElement={<TimeCell type="end">{endTime}</TimeCell>}
          position="absolute"
        />
      </div>
      <div className="relative flex items-center gap-2 max-w-[100px]">
        <EditElement
          id={id}
          fieldName={FIELD_NAMES.DURATION_MINUTES}
          editElement={
            <div className="min-w-[100px]">
              <TextField
                type="number"
                value={durationMinutes}
                label="所要時間"
                fullWidth
                onChange={(e) =>
                  handleChange("durationMinutes", e.target.value)
                }
              />
            </div>
          }
          readElement={
            <p className="px-2 bg-border rounded-full text-paper hover:scale-105 transition-all whitespace-nowrap">
              {durationMinutes} <span className="text-sm">分</span>
            </p>
          }
          position="absolute"
        />
      </div>
    </div>
  );
}

export default TimeContent;
