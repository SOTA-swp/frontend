import React from "react";

function EmojiIcon({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-9 w-9 bg-paper border border-primary rounded-full select-none">
      {children}
    </div>
  );
}

export default EmojiIcon;
