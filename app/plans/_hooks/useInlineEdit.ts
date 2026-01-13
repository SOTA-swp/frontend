import { FocusEventHandler, KeyboardEventHandler, useState } from "react";

export const useInlineEdit = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOnEditing = () => {
    setIsEditing(true);
  };

  const onBlur: FocusEventHandler = () => {
    setIsEditing(false);
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.select();
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  const inlineEditInputHandlers = {
    onBlur,
    onFocus,
    onKeyDown,
    autoFocus: true,
  };

  return {
    isEditing,
    handleOnEditing,
    inlineEditInputHandlers,
  };
};
