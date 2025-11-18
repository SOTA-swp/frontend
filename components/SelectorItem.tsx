import React from "react";

function SelectorItem({
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option>{props.children}</option>;
}

export default SelectorItem;
