import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ComponentSizeType from "@/types/componentSize";
import ComponentColor from "@/types/componentColor";

const iconButtonStyles = cva(
  "relative flex items-center justify-center aspect-square rounded-full hover:brightness-90 hover:scale-105 active:brightness-80 active:scale-95 transition",
  {
    variants: {
      variant: {
        contain: "text-paper",
        outline: "border bg-paper",
        iconOnly: "text-text-secondary",
      },
      size: {
        xs: "h-6 text-[1rem]",
        sm: "h-8 text-[1.25rem]",
        md: "h-10 text-[1.5rem]",
        lg: "h-12 text-[1.75rem]",
        xl: "h-14 text-[2rem]",
      } satisfies Record<ComponentSizeType, string>,
      colors: {
        primary: "",
        gray: "",
        accent: "",
        error: "",
      } satisfies Record<ComponentColor, string>,
      disable: {
        false: null,
        true: "bg-shadow! text-paper! hover:scale-100! hover:brightness-100 active:scale-100! active:brightness-100! transition-none! cursor-not-allowed",
      },
    },

    compoundVariants: [
      {
        variant: "contain",
        colors: "primary",
        class: "bg-primary ",
      },
      {
        variant: "contain",
        colors: "gray",
        class: "bg-text-secondary",
      },
      {
        variant: "contain",
        colors: "accent",
        class: "bg-accent",
      },
      {
        variant: "contain",
        colors: "error",
        class: "bg-error",
      },
      {
        variant: "outline",
        colors: "primary",
        class: "border-primary text-primary",
      },
      {
        variant: "outline",
        colors: "gray",
        class: "border-text-secondary text-text-secondary",
      },
      {
        variant: "outline",
        colors: "accent",
        class: "border-accent text-accent",
      },
      {
        variant: "outline",
        colors: "error",
        class: "border-error text-error",
      },
    ],
    defaultVariants: {
      variant: "contain",
      size: "md",
      colors: "primary",
    },
  }
);

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonStyles> {
  icon?: React.ReactNode;
}

function IconButton({
  size,
  variant,
  colors,
  icon,
  disable,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        iconButtonStyles({ variant, size, colors, disable }),
        className
      )}>
      {icon}
    </button>
  );
}

export default IconButton;
