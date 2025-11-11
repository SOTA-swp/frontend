"use client";
import clsx from "clsx";
import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import CommonText from "./CommonText";

function Selector({
  id,
  label,
  fullWidth = false,
  helperText,
  error,
  children,
  ...props
}: {
  id: string;
  label: string;
  labelName?: string;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
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
    <div className={clsx("relative", fullWidth && "w-full")}>
      {id && (
        <label
          htmlFor={selectId}
          className={clsx(
            "absolute left-2 -top-3 z-10 text-[14px] rounded-md border select-none transition-all duration-200",
            isFocused && "px-3",
            !isFocused && "px-2",
            !error && isFocused && "bg-primary border-primary text-paper",
            !error &&
              !isFocused &&
              "bg-paper border-border text-text-secondary",
            error && isFocused && "bg-error border-error text-paper",
            error && !isFocused && "bg-paper border-error text-error "
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
          "relative bg-paper border border-border pl-4 pr-7 py-4 rounded-md focus:outline-none focus:border  focus:transition-colors flex-1",
          error && "border-error focus:border-error",
          !error && "focus:border-primary",
          props.className,
          id && "pt-4"
        )}>
        {children}
      </select>
      <MdArrowDropDown
        className={clsx(
          "absolute top-5 right-2 text-text-secondary text-[1rem] transition-all duration-300",
          isFocused && "rotate-180",
          !isFocused && "rotate-0"
        )}
      />
      {typeof helperText === "string" ? (
        <CommonText
          className={clsx(
            "pl-1 text-[14px]",
            !error && "text-text-secondary",
            error && "text-error"
          )}>
          {helperText}
        </CommonText>
      ) : (
        helperText
      )}
    </div>
  );
}

export default Selector;
