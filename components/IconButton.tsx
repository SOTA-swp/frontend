import ComponentSizeType from "@/types/componentSize";
import clsx from "clsx";
import React from "react";

type VariantType = "primary" | "outline" | "disable" | "icon-only";

function IconButton({
  size = "md",
  variant = "primary",
  icon,
  ...props
}: {
  size?: ComponentSizeType;
  variant?: VariantType;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
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
      {icon}
    </button>
  );
}

export default IconButton;
