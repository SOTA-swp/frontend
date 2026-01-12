import ComponentColor from "@/types/componentColor";
import ComponentSize from "@/types/componentSize";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { HTMLAttributes } from "react";

const logoStyle = cva("w-[1em] h-[1em]", {
  variants: {
    color: {
      primary: "text-primary",
      gray: "text-text-secondary",
      accent: "text-accent",
      error: "text-error",
      inherit: "text-inherit",
    } satisfies Record<ComponentColor | "inherit", string>,
    size: {
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
    } satisfies Record<ComponentSize, string>,
  },
  defaultVariants: {
    color: "inherit",
    size: "md",
  },
});

type LogoProps = VariantProps<typeof logoStyle> & HTMLAttributes<SVGElement>;

function Logo({ color, size, ...props }: LogoProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      className={clsx(logoStyle({ color, size }), props.className)}>
      <circle className="fill-current" cx="285.21" cy="806.88" r="110.48" />
      <circle className="fill-current" cx="285.21" cy="806.88" r="110.48" />
      <path
        className="fill-current"
        d="M991.41,91.22h0c-11.45-11.45-30.01-11.45-41.46,0l-305.29,305.29c-11.45,11.45-30.01,11.45-41.46,0l-210.25-210.25c-11.45-11.45-30.01-11.45-41.46,0L8.59,529.18c-11.45,11.45-11.45,30.01,0,41.46l124.25,124.25c8.76,8.76,22.97,8.37,31.42-.69,30.18-32.38,73.2-52.63,120.96-52.63s87.37,18.68,117.32,48.85c8.54,8.6,22.38,8.77,30.96.2L991.41,132.67c11.45-11.45,11.45-30.01,0-41.46ZM425.81,456.1l-69.09,69.09-11.8,11.8c-6.52,6.52-17.09,6.52-23.61,0l-11.8-11.8-38.87-38.87c-6.52-6.52-6.52-17.09,0-23.61h0c6.52-6.52,17.09-6.52,23.61,0l27.07,27.07c6.52,6.52,17.09,6.52,23.61,0l57.29-57.29c6.52-6.52,17.09-6.52,23.61,0h0c6.52,6.52,6.52,17.09,0,23.61Z"
      />
    </svg>
  );
}

export default Logo;
