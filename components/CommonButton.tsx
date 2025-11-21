import { cn } from "@/lib/utils";
import ComponentColor from "@/types/componentColor";
import ComponentSizeType from "@/types/componentSize";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";

type VariantType = "contain" | "outline" | "text";

// type color = "primary" | "gray" | "accent" | "error";

const CommonButtonStyles = cva(
  `
    relative
    flex
    items-center
    justify-between
    group
    active:scale-90
    hover:scale-105
    transition
    font-bold
    `,
  {
    variants: {
      size: {
        xs: "p-0.5 px-1.5 text-[11px] rounded-sm",
        sm: "p-1 px-2 text-[12.5px] rounded-lg",
        md: "p-2 px-3 text-[14px] rounded-lg",
        lg: "p-2.5 px-3.5 text-[18px] rounded-lg",
        xl: "p-3 px-4 text-[20px] rounded-lg",
      } satisfies Record<ComponentSizeType, string>,
      variant: {
        contain: "bg-primary text-paper",
        outline:
          "border border-primary bg-paper text-primary hover:bg-primary hover:text-paper",
        text: " text-text-secondary hover:bg-primary/50 hover:text-primary",
      },
      color: {
        primary: "",
        gray: "",
        accent: "",
        error: "",
      } satisfies Record<ComponentColor, string>,
    },

    compoundVariants: [
      {
        variant: "contain",
        color: "primary",
        class: "bg-primary text-paper",
      },
      {
        variant: "contain",
        color: "gray",
        class: "bg-gray text-paper",
      },
      {
        variant: "contain",
        color: "accent",
        class: "bg-accent text-paper",
      },
      {
        variant: "contain",
        color: "error",
        class: "bg-error text-paper",
      },
      {
        variant: "outline",
        color: "primary",
        class:
          "border border-primary bg-paper text-primary hover:bg-primary hover:text-paper",
      },
      {
        variant: "outline",
        color: "gray",
        class:
          "border border-gray bg-paper text-gray hover:bg-gray hover:text-paper",
      },
      {
        variant: "outline",
        color: "accent",
        class:
          "border border-accent bg-paper text-accent hover:bg-accent hover:text-paper",
      },
      {
        variant: "outline",
        color: "error",
        class:
          "border border-error bg-paper text-error hover:bg-error hover:text-paper",
      },
      {
        variant: "text",
        color: "primary",
        class: "hover:bg-primary/30 hover:text-primary",
      },
      {
        variant: "text",
        color: "gray",
        class: "hover:bg-gray/30 hover:text-gray",
      },
      {
        variant: "text",
        color: "accent",
        class: "hover:bg-accent/30 hover:text-accent",
      },
      {
        variant: "text",
        color: "error",
        class: "hover:bg-error/30 hover:text-error",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "contain",
      color: "primary",
    },
  }
);

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof CommonButtonStyles> {
  size?: ComponentSizeType;
  variant?: VariantType;
  icon?: React.ReactNode;
  color?: ComponentColor;
  fullWidth?: boolean;
  href?: string;
  children?: React.ReactNode;
}

function CommonButton({
  size,
  variant,
  color,
  fullWidth,
  href,
  icon,
  children,
  className,
  ...props
}: CommonButtonProps) {
  const commonClassName = cn(
    CommonButtonStyles({ size, variant, color }),
    className,
    icon ? "justify-between" : "justify-center",
    fullWidth && "w-full"
  );

  const content = (
    <>
      {children}
      <span className="text-2xl">{icon}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={commonClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button {...props} className={commonClassName}>
      {content}
    </button>
  );
}

export default CommonButton;
