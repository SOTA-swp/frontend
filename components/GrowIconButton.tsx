import ComponentColor from "@/types/componentColor";
import ComponentSize from "@/types/componentSize";
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
    size: {
      xs: "text-base p-.5",
      sm: "text-xl p-1",
      md: "text-2xl p-2",
      lg: "text-3xl p-3",
      xl: "text-4xl p-4",
    } satisfies Record<ComponentSize, string>,
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

const labelColorStyle = cva(
  "absolute ml-2 px-0 h-full overflow-hidden left-full flex items-center whitespace-nowrap text-paper rounded-l-lg rounded-r-4xl opacity-0 max-w-0 z-20 border pointer-events-none",
  {
    variants: {
      color: {
        primary: "bg-primary border-primary",
        gray: "bg-text-secondary border-border",
        accent: "bg-accent border-accent",
        error: "bg-error border-error",
      } satisfies Record<ComponentColor, string>,
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

const labelSizeStyle = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    } satisfies Record<ComponentSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

interface GrowIconButtonProps
  extends
    Omit<HTMLMotionProps<"button">, "color">,
    VariantProps<typeof iconButtonStyles> {
  color?: ComponentColor;
  icon?: React.ReactNode;
  absolute?: boolean;
  children?: React.ReactNode;
}

function GrowIconButton({
  color = "primary",
  size,
  icon,
  absolute = false,
  children,
  ...props
}: GrowIconButtonProps) {
  const { disabled } = props;

  return (
    <motion.div
      className={clsx(
        "relative flex select-none rounded-full",
        disabled && "pointer-events-none! opacity-50!"
      )}
      whileHover="parentHover">
      <motion.button
        {...props}
        whileHover={"hover"}
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
          "relative flex items-center p-2 border bg-paper hover:text-paper active:scale-95 transition-all",
          !absolute && "rounded-full",
          absolute && "rounded-4xl",
          iconButtonStyles({ color, size })
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
            className={clsx(
              "relative w-0 overflow-hidden whitespace-nowrap opacity-0",
              labelSizeStyle({ size })
            )}>
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
          className={clsx(
            labelColorStyle({ color }),
            labelSizeStyle({ size })
          )}>
          {children}
        </motion.p>
      )}
    </motion.div>
  );
}

export default GrowIconButton;
