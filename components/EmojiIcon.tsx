import ComponentColor from "@/types/componentColor";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const emojiIconStyles = cva(
  "flex items-center justify-center h-9 w-9 bg-paper border rounded-full select-none",
  {
    variants: {
      color: {
        primary: "border-primary",
        gray: "border-border",
        accent: "border-accent",
        error: "border-error",
      } satisfies Record<ComponentColor, string>,
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

interface EmojiIconProps extends VariantProps<typeof emojiIconStyles> {
  children?: React.ReactNode;
}

function EmojiIcon({ color, children, ...props }: EmojiIconProps) {
  return (
    <div {...props} className={emojiIconStyles({ color })}>
      {children}
    </div>
  );
}

export default EmojiIcon;
