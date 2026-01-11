import clsx from "clsx";
import { MdSearchOff } from "react-icons/md";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

function EmptyState({
  title = "該当する結果がありません",
  description = "キーワードを調整して、もう一度お試しください。",
  icon,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "aspect-video flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-shadow/30 p-6",
        className
      )}>
      <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full text-accent shadow-sm bg-paper">
        {icon ?? <MdSearchOff className="h-6 w-6" />}
      </div>
      <div className="self-stretch space-y-1">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default EmptyState;
