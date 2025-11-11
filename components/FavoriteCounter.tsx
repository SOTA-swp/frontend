import React from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import CommonText from "./CommonText";

function FavoriteCounter({
  clicked = false,
  count = 9999,
  ...props
}: {
  clicked?: boolean;
  count?: number;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex items-center gap-1 text-paper bg-accent px-2 py-1 rounded-full tabular-nums hover:brightness-90 active:brightness-80 active:scale-90 transition-all">
      {clicked ? <MdFavorite /> : <MdFavoriteBorder />}

      <CommonText className="text-paper">{count}</CommonText>
    </button>
  );
}

export default FavoriteCounter;
