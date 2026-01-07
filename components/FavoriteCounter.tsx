import React from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import CommonText from "./CommonText";
import clsx from "clsx";

function FavoriteCounter({
  hasLiked = false,
  count = 9999,
  ...props
}: {
  hasLiked?: boolean;
  count?: number;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center gap-1 text-paper bg-accent pl-2 pr-3 py-1 rounded-full tabular-nums hover:scale-110 active:scale-90 transition-all",
        props.className
      )}>
      {hasLiked ? <MdFavorite /> : <MdFavoriteBorder />}

      <CommonText className="text-paper">{count}</CommonText>
    </button>
  );
}

export default FavoriteCounter;
