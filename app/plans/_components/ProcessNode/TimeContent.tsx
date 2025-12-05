import NodeType from "@/types/node";
import EditElement from "./EditElement";
import FIELD_NAMES from "./FIELD_NAMES";
import TextField from "@/components/TextField";
import { useNodeStore } from "../../_store/nodeStore";

type TimeContentProps = Pick<
  NodeType,
  "id" | "startTime" | "endTime" | "durationMinutes"
>;

function TimeContent({
  id,
  startTime,
  endTime,
  durationMinutes,
}: TimeContentProps) {
  const { updateNode } = useNodeStore();

  const handleChange = (
    field: keyof TimeContentProps,
    value: string | number
  ) => {
    updateNode(id, { [field]: value });
  };

  return (
    <div className="flex gap-8 items-center">
      <div className="flex gap-2 items-center">
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
          readElement={startTime}
        />
        ~
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
          readElement={endTime}
        />
      </div>
      <div className="flex items-center gap-2 max-w-[150px]">
        <EditElement
          id={id}
          fieldName={FIELD_NAMES.DURATION_MINUTES}
          editElement={
            <TextField
              type="number"
              value={durationMinutes}
              label="所要時間"
              fullWidth
              onChange={(e) => handleChange("durationMinutes", e.target.value)}
            />
          }
          readElement={<span>{durationMinutes} 分</span>}
        />
      </div>
    </div>
  );
}

export default TimeContent;
