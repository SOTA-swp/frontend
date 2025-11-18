import { cn } from "@/lib/utils";
import ComponentColor from "@/types/componentColor";
import ComponentSizeType from "@/types/componentSize";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Span } from "next/dist/trace";
import React from "react";

type VariantType = "contain" | "outline" | "text";

// type color = "primary" | "gray" | "accent" | "error";

const CommonButtonStyles = cva(
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
    {
        variants: {
            size: {
                xs: "p-0.5 text-[1rem]",
                sm: "p-1 text-[1.25rem]",
                md: "p-2 text-[14px]",
                lg: "p-2.5 text-[1.75rem]",
                xl: "p-3 text-[2rem]",
            } satisfies Record<ComponentSizeType, string>,
            variant: {
                contain: "bg-primary text-paper hover:brightness-90",
                outline: "border border-primary bg-paper text-primary hover:brightness-90",
                text: "bg-background text-TextSecondary hover:bg-[var(--primary-thin)] hover:text-primary active:brightness-100",
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
                class: "border border-primary bg-paper text-primary",
            },
            {
                variant: "outline",
                color: "gray",
                class: "border border-gray bg-paper text-gray",
            },
            {
                variant: "outline",
                color: "accent",
                class: "border border-accent bg-paper text-accent",
            },
            {
                variant: "outline",
                color: "error",
                class: "border border-error bg-paper text-error",
            },
            {
                variant: "text",
                color: "primary",
                class: "bg-background text-TextSecondary hover:bg-[var(--primary-thin)] hover:text-primary",
            },
            {
                variant: "text",
                color: "gray",
                class: "bg-background text-TextSecondary hover:bg-[var(--primary-thin)] hover:text-primary",
            },
            {
                variant: "text",
                color: "accent",
                class: "bg-background text-TextSecondary hover:bg-[var(--primary-thin)] hover:text-primary",
            },
            {
                variant: "text",
                color: "error",
                class: "bg-background text-TextSecondary hover:bg-[var(--primary-thin)] hover:text-primary",
            },
        ],
        defaultVariants: {
            size: "md",
            variant: "contain",
            color: "primary",
        },
    }
 )

 interface CommonButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
       VariantProps<typeof CommonButtonStyles> {
    size?: ComponentSizeType;
    variant?: VariantType;
    icon?: React.ReactNode;
    text?: React.ReactNode;
    color?: ComponentColor;
}

function CommonButton({
    size,
    variant,
    color,
    icon,
    text,
    className,
    ...props
}: CommonButtonProps) {
    return(
        <button
            {...props}
            className={cn(CommonButtonStyles({size, variant, color}), className)}>
            {text && <span className="ml-2">{text}</span>}
            {icon && <span className="ml-15">{icon}</span>}
        </button>
    );
}

export default CommonButton;
//     return (
//         <button
//             {...props}
//             className={clsx(
//                 `
//                 relative
//                 flex
//                 items-center
//                 justify-items-center
//                 rounded-xl
//                 group
//                 active:scale-90
//                 transition
//                 `,
//                 size === "xs" && "p-0.5 text-[1rem]",
//                 size === "sm" && "p-1 text-[1.25rem]",
//                 size === "md" && "p-2 text-[14px]",
//                 size === "lg" && "p-2.5 text-[1.75rem]",
//                 size === "xl" && "p-3 text-[2rem]",
//                 variant === "contain" && 
//                     clsx(
//                         color === "primary" && `bg-primary text-paper hover:brightness-90`,
//                         color === "gray" && `bg-gray text-paper hover:brightness-90`,
//                         color === "accent" && `bg-accent text-paper hover:brightness-90`,
//                         color === "error" && `bg-error text-paper hover:brightness-90`,
//                     ),
//                 variant === "outline" && 
//                     clsx(
//                         color === "primary" && `border border-primary bg-paper text-primary hover:brightness-90`,
//                         color === "gray" && `border border-gray bg-paper text-gray hover:brightness-90`,
//                         color === "accent" && `border border-accent bg-paper text-accent hover:brightness-90`,
//                         color === "error" && `border border-error bg-paper text-error hover:brightness-90`,
//                     ),
//                 variant === "text" &&
//                     clsx(
//                         color == "primary" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
//                         color == "gray" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
//                         color == "accent" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
//                         color == "error" && "bg-background text-TextSecondary hover:bg-(--primary-thin) hover:text-primary active:brightness-100",
//                     ),
//                 props.className
//             )}>
//             {text && <span className="ml-2">{text}</span>}
//             {icon && <span className="ml-15">{icon}</span>}
//         </button>
//     );
// }

// export default CommonButton;

