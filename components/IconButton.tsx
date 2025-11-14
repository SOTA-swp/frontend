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
      color: {
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
        color: "primary",
        class: "bg-primary ",
      },
      {
        variant: "contain",
        color: "gray",
        class: "bg-text-secondary",
      },
      {
        variant: "contain",
        color: "accent",
        class: "bg-accent",
      },
      {
        variant: "contain",
        color: "error",
        class: "bg-error",
      },
      {
        variant: "outline",
        color: "primary",
        class: "border-primary text-primary",
      },
      {
        variant: "outline",
        color: "gray",
        class: "border-text-secondary text-text-secondary",
      },
      {
        variant: "outline",
        color: "accent",
        class: "border-accent text-accent",
      },
      {
        variant: "outline",
        color: "error",
        class: "border-error text-error",
      },
    ],
    defaultVariants: {
      variant: "contain",
      size: "md",
      color: "primary",
    },
  }
);

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof iconButtonStyles> {
  icon?: React.ReactNode;
}

function IconButton({
  size,
  variant,
  color,
  icon,
  disable,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        iconButtonStyles({ variant, size, color, disable }),
        className
      )}>
      {icon}
    </button>
  );
}

export default IconButton;
