import { useInlineEdit } from "@/app/plans/_hooks/useInlineEdit";
import EditElement from "../EditElement";
import TextField from "@/components/TextField";
import { ChangeEventHandler, ReactNode } from "react";
import clsx from "clsx";

export const TIME_CELL_TYPES = {
  START: "start",
  END: "end",
  DURATION: "duration",
} as const;

export type TimeCellType =
  (typeof TIME_CELL_TYPES)[keyof typeof TIME_CELL_TYPES];

const startAndEndStyle = clsx(
  "text-text-secondary border-b border-transparent hover:border-b hover:border-border transition-all"
);

interface TimeCellProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: TimeCellType;
  value: string | number;
}

function TimeCell({
  onChange,
  type = TIME_CELL_TYPES.START,
  value,
}: TimeCellProps) {
  const { isEditing, handleOnEditing, inlineEditInputHandlers } =
    useInlineEdit();

  const timeCellData: Record<
    TimeCellType,
    {
      type: "time" | "number";
      label: string;
      readElement: ReactNode;
    }
  > = {
    start: {
      type: "time",
      label: "開始時刻",
      readElement: <p className={clsx(startAndEndStyle, "text-lg")}>{value}</p>,
    },
    end: {
      type: "time",
      label: "終了時刻",
      readElement: <p className={clsx(startAndEndStyle, "text-sm")}>{value}</p>,
    },
    duration: {
      type: "number",
      label: "所要時間",
      readElement: (
        <p className="px-2 bg-border rounded-full text-paper hover:scale-105 transition-all whitespace-nowrap">
          {value} <span className="text-sm">分</span>
        </p>
      ),
    },
  };

  return (
    <EditElement
      isEditing={isEditing}
      onClick={handleOnEditing}
      editElement={
        <TextField
          onChange={onChange}
          label={timeCellData[type].label}
          type={timeCellData[type].type}
          min={0}
          value={value}
          {...inlineEditInputHandlers}
        />
      }
      readElement={timeCellData[type].readElement}
      position="absolute"
    />
  );
}

export default TimeCell;
