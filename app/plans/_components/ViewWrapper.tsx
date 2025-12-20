import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface ViewWrapperProps extends HTMLAttributes<HTMLDivElement> {
  overflow?: "clip" | "auto";
  children: ReactNode;
}

function ViewWrapper({
  overflow = "clip",
  children,
  ...props
}: ViewWrapperProps) {
  return (
    <div
      {...props}
      className={clsx(
        "border border-border rounded-2xl flex-1 min-w-0 min-h-0 h-full",
        overflow === "auto" ? "overflow-auto" : "overflow-clip",
        props.className
      )}>
      {children}
    </div>
  );
}

export default ViewWrapper;
