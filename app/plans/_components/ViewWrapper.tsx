import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { Panel, PanelProps } from "react-resizable-panels";

interface ViewWrapperProps extends HTMLAttributes<HTMLTableSectionElement> {
  overflow?: "clip" | "auto";
  paper?: boolean;
  outerElement?: ReactNode;
  panelProps?: PanelProps;
  children: ReactNode;
}

function ViewWrapper({
  overflow = "clip",
  paper = false,
  outerElement,
  children,
  id,
  panelProps,
  ...props
}: ViewWrapperProps) {
  return (
    <Panel {...panelProps}>
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
    </Panel>
  );
}

export default ViewWrapper;
