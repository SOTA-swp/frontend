import { cva, type VariantProps } from "class-variance-authority";
import ComponentColor from "@/types/componentColor";
import CommonText from "./CommonText";

const chipStyles = cva("px-2 py-1 text-xs flex whitespace-nowrap", {
  variants: {
    variant: {
      outline: "border",
      contain: "",
    },
    color: {
      primary: "",
      gray: "",
      accent: "",
      error: "",
    } satisfies Record<ComponentColor, string>,
    rounded: {
      false: "rounded-md",
      true: "rounded-full",
    },
  },

  compoundVariants: [
    {
      variant: "contain",
      color: "primary",
      class: "text-paper bg-primary",
    },
    {
      variant: "contain",
      color: "gray",
      class: "text-paper bg-text-secondary",
    },
    {
      variant: "contain",
      color: "accent",
      class: "text-paper bg-accent",
    },
    {
      variant: "contain",
      color: "error",
      class: "text-paper bg-error",
    },
    {
      variant: "outline",
      color: "primary",
      class: "text-primary border-primary",
    },
    {
      variant: "outline",
      color: "gray",
      class: "text-text-secondary border-text-secondary",
    },
    {
      variant: "outline",
      color: "accent",
      class: "text-accent border-accent",
    },
    {
      variant: "outline",
      color: "error",
      class: "text-error border-error",
    },
  ],

  defaultVariants: {
    variant: "contain",
    color: "primary",
    rounded: false,
  },
});

interface ChipProps extends VariantProps<typeof chipStyles> {
  children?: React.ReactNode;
}

function Chip({ children, variant, color, rounded, ...props }: ChipProps) {
  return (
    <div {...props} className={chipStyles({ variant, color, rounded })}>
      <button></button>
      <CommonText>{children}</CommonText>
    </div>
  );
}

export default Chip;
