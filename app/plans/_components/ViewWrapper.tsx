import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface ViewWrapperProps extends HTMLAttributes<HTMLDivElement> {
  overflow?: "clip" | "auto";
  paper?: boolean;
  outerElement?: ReactNode;
  children: ReactNode;
}

function ViewWrapper({
  overflow = "clip",
  paper = false,
  outerElement,
  children,
  ...props
}: ViewWrapperProps) {
  return (
    <section
      {...props}
      className={clsx(
        "relative border border-border rounded-2xl flex-1 min-w-0 min-h-0 h-full overflow-clip",
        paper && "bg-paper",
        props.className
      )}>
      <div
        className={clsx(
          "h-full",
          overflow === "auto" ? "overflow-scroll" : "overflow-clip"
        )}>
        {children}
      </div>
      {outerElement}
    </section>
  );
}

export default ViewWrapper;
