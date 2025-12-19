import clsx from "clsx";
import { ReactNode } from "react";

interface TimeCellProps {
  type?: "start" | "end";
  children: ReactNode;
}

function TimeCell({ type = "start", children }: TimeCellProps) {
  return (
    <p
      className={clsx(
        "text-text-secondary border-b border-transparent hover:border-b hover:border-border transition-all",
        type === "start" ? "text-lg" : "text-sm"
      )}>
      {children}
    </p>
  );
}

export default TimeCell;
