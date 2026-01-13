import ComponentColor from "@/types/componentColor";
import ComponentSize from "@/types/componentSize";
import { cva, VariantProps } from "class-variance-authority";
import { RiLoader4Line } from "react-icons/ri";

const loadingSpinnerStyle = cva("flex items-center justify-center", {
  variants: {
    size: {
      xs: "text-sm",
      sm: "text-base",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    } satisfies Record<ComponentSize, string>,
    color: {
      primary: "text-primary",
      gray: "text-border",
      accent: "text-accent",
      error: "text-error",
    } satisfies Record<ComponentColor, string>,
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

type LoadingSpinnerProps = VariantProps<typeof loadingSpinnerStyle>;

function LoadingSpinner({ size, color }: LoadingSpinnerProps) {
  return (
    <div
      className={loadingSpinnerStyle({ size, color })}
      aria-label="読み込み中">
      <RiLoader4Line className="animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
