import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";
import { MdAdd } from "react-icons/md";

function AddButton({
  icon = <MdAdd />,
  children,
  ...props
}: {
  icon?: ReactNode;
  children?: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "flex flex-col items-center justify-center text-text-secondary border-2 border-dotted border-border rounded-lg hover:scale-105 active:scale-100 transition-all",
        props.className
      )}>
      <span className="text-4xl">{icon}</span>
      {children}
    </button>
  );
}

export default AddButton;
