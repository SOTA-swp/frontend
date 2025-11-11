import ComponentColor from "@/types/componentColor";
import clsx from "clsx";
import React from "react";

function EmojiIcon({
  color = "primary",
  children,
}: {
  color?: ComponentColor;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center h-9 w-9 bg-paper border rounded-full select-none",
        color === "primary" && "border-primary",
        color === "gray" && "border-border",
        color === "accent" && "border-accent",
        color === "error" && "border-error"
      )}>
      {children}
    </div>
  );
}

export default EmojiIcon;
