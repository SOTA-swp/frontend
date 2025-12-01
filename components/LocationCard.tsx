import React from "react";
import LocationType from "@/types/location";
import TextField from "@/components/TextField";
import EmojiIcon from "@/components/EmojiIcon";
import clsx from "clsx";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { motion, AnimatePresence } from "motion/react";
import { div } from "motion/react-client";


function LocationCard({ location }: { location: LocationType }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      transition={{duration: 0.3, ease: "easeInOut"}}
      className={clsx(
        "relative max-w-sm flex flex-col rounded-lg overflow-hidden bg-paper p-4 gap-[25px]"
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        {isExpanded && (
          <motion.div
            key="accordion"
            initial={{ opacity: 0, height: 0 }} // 開始時: 透明で高さ0>
            animate={{ opacity: 1, height: "auto" }} // 表示時: 不透明で高さが自動
            exit={{ opacity: 0, height: 0 }} // 終了時: 透明で高さ0
            transition={{ duration: 0.5 }}
            className="overflow-hidden space-y-6" // overflow-hiddenが重要
          >
            <div className="flex items-center gap-4 pt-3">
              <EmojiIcon color="primary">📍</EmojiIcon>
              <div className=" flex-2">
                <TextField
                  label="ロケーション名"
                  value={location.title}
                  placeholder="プレースホルダー"
                  autoComplete="off"
                  fullWidth
                />
              </div>
            </div>

            <div>
              <TextField
                label="住所"
                value={location.address}
                placeholder="プレースホルダー"
                autoComplete="off"
                fullWidth
              />
            </div>

            <div>
              <TextField
                label="メモ"
                value={location.discription}
                placeholder="プレースホルダー"
                textarea
                autoComplete="off"
                fullWidth
              />
            </div>

            <div>
              <div
                className="w-full h-[150px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url(${location.sumnail})` }}
              ></div>
            </div>

            <button
              onClick={toggleExpand}
              className="w-full h-4 flex justify-center"
            >
              <MdArrowDropUp className="text-lg text-text-secondary" />
            </button>
          </motion.div>
        )}

        {!isExpanded && (
          <motion.button
            key="header"
            initial={{ opacity: 0 }} // 開始時: 透明
            animate={{ opacity: 1 }} // 表示時: 不透明
            exit={{ opacity: 0 }} // 終了時: 透明
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
            onClick={toggleExpand}
          >
            <div className="flex items-center gap-4">
              <EmojiIcon color="primary">📍</EmojiIcon>
              <h3>{location.title}</h3>
            </div>
            <MdArrowDropDown className="text-lg text-text-secondary" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LocationCard;
