import ComponentColor from "@/types/componentColor";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
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

const labelStyle = cva(
  "absolute ml-2 px-0 h-full overflow-hidden left-full flex items-center whitespace-nowrap text-paper rounded-l-lg rounded-r-4xl opacity-0 max-w-0 z-20 pointer-events-none",
  {
    variants: {
      color: {
        primary: "bg-primary",
        gray: "bg-text-secondary",
        accent: "bg-accent",
        error: "bg-error",
      },
    },
  }
);

interface GrowIconButtonProps
  extends Omit<HTMLMotionProps<"button">, "color">,
    VariantProps<typeof iconButtonStyles> {
  color?: ComponentColor;
  icon?: React.ReactNode;
  absolute?: boolean;
  children?: React.ReactNode;
}

function GrowIconButton({
  color = "primary",
  icon,
  absolute = false,
  children,
  ...props
}: GrowIconButtonProps) {
  return (
    <motion.div
      className="relative flex select-none rounded-full"
      whileHover="parentHover">
      <motion.button
        {...props}
        whileHover="hover"
        variants={
          absolute
            ? {
                hover: {
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                  transition: { type: "tween", ease: "linear", duration: 0.2 },
                },
              }
            : {}
        }
        className={clsx(
          "relative flex items-center text-2xl p-2 border bg-paper hover:text-paper active:scale-95 transition-all",
          !absolute && "rounded-full",
          absolute && "rounded-4xl",
          iconButtonStyles({ color })
        )}>
        {icon}
        {!absolute && (
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
        )}
      </motion.button>
      {absolute && (
        <motion.p
          variants={{
            parentHover: {
              maxWidth: "500vw",
              opacity: 1,
              paddingLeft: "8px",
              paddingRight: "16px",
              transition: { delay: 0.2 },
            },
          }}
          className={labelStyle({ color })}>
          {children}
        </motion.p>
      )}
    </motion.div>
  );
}

export default GrowIconButton;
