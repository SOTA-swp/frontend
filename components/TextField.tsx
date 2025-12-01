"use client";
import clsx from "clsx";
import React from "react";
import CommonText from "./CommonText";

function TextField<T extends boolean = false>({
  label = "",
  fullWidth = false,
  textarea,
  error,
  helperText,
  ...props
}: {
  label?: string;
  fullWidth?: boolean;
  textarea?: T;
  error?: boolean;
  helperText?: React.ReactNode;
} & (T extends true
  ? React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  : React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >)) {
  const [isFocus, setIsFocus] = React.useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const commonClassName = clsx(
    "bg-paper border border-border px-4 py-2 rounded-md focus:outline-none focus:border focus:border-primary focus:shadow-primary focus:transition-colors placeholder:select-none",
    error &&
      "border-error focus:border-error! focus:shadow-error! placeholder:text-error/50",
    label && "pt-4",
    fullWidth && "w-full"
  );

  return (
    <div className={clsx("relative", fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={label}
          className={clsx(
            "absolute left-2 text-[14px] bg-paper rounded-md border  select-none transition-all duration-200",
            isFocus && "border-primary bg-primary text-paper! px-3 -top-3",
            !isFocus && "border-border text-text-secondary px-2",
            !isFocus && !props.value && "top-2",
            !isFocus && (props.value || props.placeholder) && "-top-3!",
            error && "border-error! text-error! ",
            error && isFocus && "bg-error!"
          )}>
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={label}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={commonClassName}
        />
      ) : (
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={label}
          type={
            (props as React.InputHTMLAttributes<HTMLInputElement>).type ||
            "text"
          }
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={commonClassName}
        />
      )}
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

export default TextField;
