import { useInlineEdit } from "@/app/plans/_hooks/useInlineEdit";
import EditElement from "../EditElement";
import TextField from "@/components/TextField";
import { ChangeEventHandler, ReactNode } from "react";
import clsx from "clsx";
import { isoToTime, timeToIso } from "@/utils/date";

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

  // 表示・入力用に変換 (ISO -> HH:mm)
  // DURATION の場合は変換しない
  const displayValue =
    type === TIME_CELL_TYPES.DURATION
      ? value
      : typeof value === "string"
      ? isoToTime(value)
      : value;

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (type === TIME_CELL_TYPES.DURATION) {
      onChange(e);
      return;
    }

    // 入力値 (HH:mm) を ISO に戻して親に渡す
    // 元の value が ISO 文字列でない場合（初期状態など）は、基準日を使って ISO にする
    const baseIso =
      typeof value === "string" && value
        ? value
        : new Date("2000-01-01T00:00:00.000Z").toISOString();

    const newValue = timeToIso(e.target.value, baseIso);

    // イベントオブジェクトを複製して値を書き換える（Reactの合成イベントは直接書き換え非推奨だが、簡易的に）
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    };
    onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
  };

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
      readElement: <p className={clsx(startAndEndStyle, "text-lg")}>{displayValue}</p>,
    },
    end: {
      type: "time",
      label: "終了時刻",
      readElement: <p className={clsx(startAndEndStyle, "text-sm")}>{displayValue}</p>,
    },
    duration: {
      type: "number",
      label: "所要時間",
      readElement: (
        <p className="px-2 bg-border rounded-full text-paper hover:scale-105 transition-all whitespace-nowrap">
          {displayValue} <span className="text-sm">分</span>
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
          onChange={handleTimeChange}
          label={timeCellData[type].label}
          type={timeCellData[type].type}
          min={0}
          value={displayValue}
          {...inlineEditInputHandlers}
        />
      }
      readElement={timeCellData[type].readElement}
      position="absolute"
    />
  );
}

export default TimeCell;
