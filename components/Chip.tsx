import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import ComponentSizeType from "@/types/componentSize";
import ComponentColor from "@/types/componentColor";
import CommonText from "./CommonText";

const chipStyles = cva(
  "rounded-md px-2 py-1 text-xs flex",
{
  variants: {
   variant: {
      outline: "border bg-paper",
      contain: ""
   },
   color: {
      primary: "",
      gray: "",
   },
  },

  compoundVariants: [
    {
      variant: "contain",
      color: "primary",
      class: "text-paper bg-primary",
    },
    {
      variant: "contain",
      color: "gray",
      class: "text-paper bg-text-secondary",
    },
    {
      variant: "outline",
      color: "primary",
      class: "text-primary border-primary",
    },
    {
      variant: "outline",
      color: "gray",
      class: "text-text-secondary border-text-secondary",
    },
  ]

  }
);



interface ChipProps 
  extends VariantProps<typeof chipStyles>{
    children?: React.ReactNode
  }

function Chip({
  children,
  variant,
  color,
  ...props
}: ChipProps) {
  return (
    <div
      {...props}
      className={cn(
        chipStyles({variant, color})
      )}
    >
      <button></button>
      <CommonText>{children}</CommonText>
    </div>
  );
}

export default Chip;
