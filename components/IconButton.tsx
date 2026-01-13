import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ComponentSize from "@/types/componentSize";
import ComponentColor from "@/types/componentColor";
import Link from "next/link";

const iconButtonStyles = cva(
  "relative flex items-center justify-center aspect-square rounded-full hover:scale-105 active:scale-95 transition",
  {
    variants: {
      variant: {
        contain: "text-paper",
        outline: "border bg-paper",
        iconOnly: "",
      },
      size: {
        xs: "h-6 text-[1rem]",
        sm: "h-8 text-[1.25rem]",
        md: "h-10 text-[1.5rem]",
        lg: "h-12 text-[1.75rem]",
        xl: "h-14 text-[2rem]",
      } satisfies Record<ComponentSize, string>,
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
      {
        variant: "iconOnly",
        color: "primary",
        class: "text-primary hover:bg-primary/10",
      },
      {
        variant: "iconOnly",
        color: "gray",
        class: "text-text-secondary hover:bg-text-secondary/10",
      },
      {
        variant: "iconOnly",
        color: "accent",
        class: "text-accent hover:bg-accent/10",
      },
      {
        variant: "iconOnly",
        color: "error",
        class: "text-error hover:bg-error/10",
      },
    ],
    defaultVariants: {
      variant: "contain",
      size: "md",
      color: "primary",
    },
  }
);

export interface IconButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof iconButtonStyles> {
  icon?: React.ReactNode;
  href?: string;
}

function IconButton({
  size,
  variant,
  color,
  icon,
  disable,
  className,
  href,
  ...props
}: IconButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          iconButtonStyles({ variant, size, color, disable }),
          className
        )}>
        {icon}
      </Link>
    );
  }
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
