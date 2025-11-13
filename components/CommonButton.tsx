import ComponentColor from "@/types/componentColor";
import ComponentSizeType from "@/types/componentSize";
import clsx from "clsx";
import { Span } from "next/dist/trace";
import React from "react";

type VariantType = "contain" | "outline" | "text";

// type color = "primary" | "gray" | "accent" | "error";

function CommonButton({
    size ="md",
    variant = "contain",
    color = "primary",
    icon,
    text,
    ...props
}: {
    size?:ComponentSizeType;
    variant?:VariantType;
    icon?:React.ReactNode;
    text?:React.ReactNode;
    color?:ComponentColor;
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
                rounded-xl
                group
                active:scale-90
                transition
                `,
                size === "xs" && "p-0.5 text-[1rem]",
                size === "sm" && "p-1 text-[1.25rem]",
                size === "md" && "p-2 text-[14px]",
                size === "lg" && "p-2.5 text-[1.75rem]",
                size === "xl" && "p-3 text-[2rem]",
                variant === "contain" && 
                    clsx(
                        color === "primary" && `bg-primary text-paper hover:brightness-90`,
                        color === "gray" && `bg-gray text-paper hover:brightness-90`,
                        color === "accent" && `bg-accent text-paper hover:brightness-90`,
                        color === "error" && `bg-error text-paper hover:brightness-90`,
                    ),
                variant === "outline" && 
                    clsx(
                        color === "primary" && `border border-primary bg-paper text-primary hover:brightness-90`,
                        color === "gray" && `border border-gray bg-paper text-gray hover:brightness-90`,
                        color === "accent" && `border border-accent bg-paper text-accent hover:brightness-90`,
                        color === "error" && `border border-error bg-paper text-error hover:brightness-90`,
                    ),
                variant === "text" &&
                    clsx(
                        color == "primary" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
                        color == "gray" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
                        color == "accent" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
                        color == "error" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
                    ),
                props.className
            )}>
            {text && <span className="ml-2">{text}</span>}
            {icon && <span className="ml-15">{icon}</span>}
        </button>
    );
}

export default CommonButton;

