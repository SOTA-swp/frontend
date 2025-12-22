"use client";
import clsx from "clsx";

interface ToggleElementProps {
  isEditing?: boolean;
  onClick?: () => void;
  editElement: React.ReactNode;
  readElement: React.ReactNode;
  className?: string;
  position?: "inline" | "absolute";
}

function EditElement({
  isEditing = false,
  onClick,
  editElement,
  readElement,
  className,
  position = "inline",
}: ToggleElementProps) {
  if (isEditing) {
    return (
      <div className="relative flex items-center">
        {position === "absolute" && (
          <span className="opacity-0">{readElement}</span>
        )}
        <span
          className={clsx(
            "z-10",
            position === "absolute" && "absolute left-0"
          )}>
          {editElement}
        </span>
      </div>
    );
  } else {
    return (
      <button className={clsx("text-start", className)} onClick={onClick}>
        {readElement}
      </button>
    );
  }
}

export default EditElement;
