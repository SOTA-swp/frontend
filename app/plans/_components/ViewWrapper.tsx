import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface ViewWrapperProps extends HTMLAttributes<HTMLTableSectionElement> {
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
  id,
  ...props
}: ViewWrapperProps) {
  return (
    <section
      {...props}
      id={`${id}-wrapper`}
      className={clsx(
        "relative border border-border rounded-2xl flex-1 min-w-0 min-h-0 h-full overflow-clip",
        paper && "bg-paper",
        props.className
      )}>
      <div
        id={id}
        className={clsx(
          "h-full",
          overflow === "auto" ? "overflow-auto" : "overflow-clip"
        )}>
        {children}
      </div>
      {outerElement}
    </section>
  );
}

export default ViewWrapper;
