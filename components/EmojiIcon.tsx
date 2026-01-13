import ComponentColor from "@/types/componentColor";
import ComponentSize from "@/types/componentSize";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const emojiIconStyles = cva(
  "flex shrink-0 items-center justify-center bg-paper border rounded-full select-none",
  {
    variants: {
      color: {
        primary: "border-primary",
        gray: "border-border",
        accent: "border-accent",
        error: "border-error",
      } satisfies Record<ComponentColor, string>,
      size: {
        xs: "h-6 w-6 text-sm",
        sm: "h-8 w-8 text-sm",
        md: "h-9 w-9",
        lg: "h-10 w-10 text-lg",
        xl: "h-12 w-12 text-2xl",
      } satisfies Record<ComponentSize, string>,
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  }
);

interface EmojiIconProps extends VariantProps<typeof emojiIconStyles> {
  children?: React.ReactNode;
}

function EmojiIcon({ color, size, children, ...props }: EmojiIconProps) {
  return (
    <div {...props} className={emojiIconStyles({ color, size })}>
      {children}
    </div>
  );
}

export default EmojiIcon;
