"use client";
import clsx from "clsx";
import React from "react";

function TextField({
  label = "",
  fullWidth = false,
  itemType = "text",
  ...props
}: {
  label?: string;
  fullWidth?: boolean;
} & React.HTMLAttributes<HTMLInputElement>) {
  const [isFocus, setIsFocus] = React.useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div className={clsx("relative", fullWidth && "w-full")}>
      <label
        className={clsx(
          "absolute -top-3 left-2 px-3 text-text-secondary text-[14px] bg-paper rounded-md border border-border select-none transition-colors duration-200",
          isFocus && "border-primary bg-primary text-paper!"
        )}>
        {label}
      </label>
      <input
        itemType={itemType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
        className={clsx(
          "bg-paper border border-border p-2 rounded-md focus:outline-none focus:border focus:border-primary focus:shadow-primary focus:transition-colors",
          label && "pt-4",
          fullWidth && "w-full"
        )}
      />
    </div>
  );
}

export default TextField;
