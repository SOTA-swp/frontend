"use client";
import clsx from "clsx";
import React from "react";
import { MdArrowDropDown } from "react-icons/md";

function Selector({
  id,
  label,
  fullWidth = false,
  children,
  ...props
}: {
  id: string;
  label: string;
  labelName?: string;
  fullWidth?: boolean;
} & React.OptionHTMLAttributes<HTMLSelectElement>) {
  const [isFocused, setIsFocused] = React.useState(false);
  const selectId = `selector-${id}`;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={clsx("relative flex items-center", fullWidth && "w-full")}>
      {id && (
        <label
          htmlFor={selectId}
          className={clsx(
            "absolute left-2 -top-3 z-10 text-[14px] bg-paper rounded-md border select-none transition-all duration-200",
            isFocused && "border-primary bg-primary text-paper px-3",
            !isFocused && "border-border text-text-secondary px-2"
          )}>
          {label}
        </label>
      )}
      <select
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={selectId}
        name={id}
        {...props}
        className={clsx(
          "relative bg-paper border border-border pl-4 pr-7 py-4 rounded-md focus:outline-none focus:border focus:border-primary focus:transition-colors flex-1",
          props.className,
          id && "pt-4"
        )}>
        {children}
      </select>
      <MdArrowDropDown
        className={clsx(
          "absolute right-2 text-text-secondary text-[1rem] transition-all duration-300",
          isFocused && "rotate-180",
          !isFocused && "rotate-0"
        )}
      />
    </div>
  );
}

export default Selector;
