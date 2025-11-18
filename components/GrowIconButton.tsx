import { cn } from "@/lib/utils";
import ComponentColor from "@/types/componentColor";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "motion/react";
import React from "react";

const iconButtonStyles = cva("", {
  variants: {
    color: {
      primary: "text-primary border-primary hover:bg-primary",
      gray: "text-text-secondary border-border hover:bg-text-secondary",
      accent: "text-accent border-accent hover:bg-accent",
      error: "text-error border-error hover:bg-error",
    } satisfies Record<ComponentColor, string>,
  },
  defaultVariants: {
    color: "primary",
  },
});

interface GrowIconButtonProps
  extends Omit<HTMLMotionProps<"button">, "color">,
    VariantProps<typeof iconButtonStyles> {
  color?: ComponentColor;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

function GrowIconButton({
  icon,
  children,
  color,
  ...props
}: GrowIconButtonProps) {
  return (
    <motion.button
      {...props}
      whileHover="hover"
      className={cn(
        "flex items-center text-2xl p-2 border rounded-full bg-paper hover:text-paper transition-all active:scale-95",
        iconButtonStyles({ color })
      )}>
      {icon}
      <motion.p
        variants={{
          hover: {
            width: "auto",
            opacity: 1,
            marginLeft: "8px",
            marginRight: "8px",
          },
        }}
        className="relative w-0 overflow-hidden text-[1rem] whitespace-nowrap opacity-0">
        {children}
      </motion.p>
    </motion.button>
  );
}

export default GrowIconButton;
