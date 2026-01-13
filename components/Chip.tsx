import { cva, type VariantProps } from "class-variance-authority";
import ComponentColor from "@/types/componentColor";
import ComponentSize from "@/types/componentSize";

const chipStyles = cva("px-2 py-1 flex whitespace-nowrap", {
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
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    } satisfies Record<ComponentSize, string>,
    rounded: {
      false: "rounded-md",
      true: "rounded-full px-4",
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
    size: "md",
    rounded: false,
  },
});

interface ChipProps extends VariantProps<typeof chipStyles> {
  children?: React.ReactNode;
}

function Chip({
  children,
  variant,
  color,
  rounded,
  size,
  ...props
}: ChipProps) {
  return (
    <div {...props} className={chipStyles({ variant, color, rounded, size })}>
      {children}
    </div>
  );
}

export default Chip;
