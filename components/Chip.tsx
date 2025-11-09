import clsx from "clsx";
import CommonText from "./CommonText";

type VariantType = "outline" | "contain";
type color = "primary" | "gray";

function Chip({
  children,
  variant,
  color,
  ...props
}: {
  children?: React.ReactNode;
  variant?: VariantType;
  color?: color;
}) {
  return (
    <div
      {...props}
      className={clsx(
        "rounded-md px-2 py-1 text-xs",
        variant === "outline" &&
          color === "primary" &&
          "border text-primary bg-paper border-primary",
        variant === "outline" &&
          color === "gray" &&
          "border text-text-secondary bg-paper border-text-secondary",
        variant === "contain" && color === "primary" && "text-paper bg-primary",
        variant === "contain" &&
          color === "gray" &&
          "text-paper bg-text-secondary"
      )}
    >
      <CommonText>{children}</CommonText>
    </div>
  );
}

export default Chip;
