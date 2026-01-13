import React from "react";
import CommonText from "./CommonText";
import { cva, VariantProps } from "class-variance-authority";
import ComponentColor from "@/types/componentColor";
import { cn } from "@/lib/utils";

const containerSlot = cva("", {
  variants: {
    color: {
      primary: "text-primary",
      gray: "text-text-secondary",
      accent: "text-accent",
      error: "text-error",
    } satisfies Record<ComponentColor, string>,
  },
  defaultVariants: {
    color: "primary",
  },
});

const pointSlot = cva("", {
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
});

const borderSlot = cva("", {
  variants: {
    color: {
      primary: "bg-primary",
      gray: "bg-border",
      accent: "bg-accent",
      error: "bg-error",
    } satisfies Record<ComponentColor, string>,
  },
  defaultVariants: {
    color: "primary",
  },
});

const getSectionTitleStyles = (props: VariantProps<typeof containerSlot>) => {
  const { color } = props;

  return {
    containerStyle: containerSlot({ color }),
    pointSTyle: pointSlot({ color }),
    borderStyle: borderSlot({ color }),
  };
};

interface containerSlot extends VariantProps<typeof containerSlot> {
  color?: ComponentColor;
  icon?: React.ReactNode;
  children?: string;
}

function SectionTitle({ color, icon, children }: containerSlot) {
  const { containerStyle, borderStyle, pointSTyle } = getSectionTitleStyles({
    color,
  });

  return (
    <div
      className={cn(
        "relative flex items-center text-2xl gap-4 ml-8",
        containerStyle
      )}>
      <div className="flex items-center gap-2">
        {icon}
        <CommonText level="h3">{children}</CommonText>
      </div>
      <div className="relative flex-1 flex items-center">
        <div
          className={cn(
            "absolute left-0 h-2 w-2 border rounded-full ",
            pointSTyle
          )}
        />
        <div className={cn("absolute left-2 w-dvw h-px", borderStyle)} />
      </div>
    </div>
  );
}

export default SectionTitle;
