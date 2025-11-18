import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ComponentSizeType from "@/types/componentSize";
import ComponentColor from "@/types/componentColor";

const iconButtonStyles = cva(
  "relative flex items-center justify-center aspect-square rounded-full hover:scale-105 active:scale-95 transition",
  {
    variants: {
      variant: {
        contain: "text-paper",
        outline: "border bg-paper",
        iconOnly: "text-text-secondary hover:bg-shadow",
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
<<<<<<< HEAD
      className={clsx(
        `
        relative
        flex 
        items-center 
        justify-items-center 
        rounded-full
        group
        hover:brightness-90
        active:brightness-80
        transition
        
        `,
        size === "xs" && "p-0.5 text-[1rem]",
        size === "sm" && "p-1 text-[1.25rem]",
        size === "md" && "p-2 text-[1.5rem]",
        size === "lg" && "p-2.5 text-[1.75rem]",
        size === "xl" && "p-3 text-[2rem]",
        variant === "primary" && "bg-primary text-paper",
        variant === "outline" && "border border-primary bg-paper text-primary",
        variant === "disable" &&
          "bg-shadow text-paper hover:brightness-100 active:brightness-100 cursor-not-allowed",
        variant === "icon-only" && "bg-transparent text-text-secondary",
        props.className
      )}>
      <div
        className="
        absolute
        inset-0
        rounded-full
        bg-transparent
        group-hover:bg-shadow/50
        group-active:bg-shadow/70
        transition
      "
      />
=======
      className={cn(
        iconButtonStyles({ variant, size, color, disable }),
        className
      )}
    >
>>>>>>> feate/create-common-components
      {icon}
    </button>
  );
}

export default IconButton;
