"use client";

import LocationType from "@/types/location";
import TextField from "@/components/TextField";
import EmojiIcon from "@/components/EmojiIcon";
import clsx from "clsx";
import { MdArrowDropDown, MdArrowDropUp, MdDelete } from "react-icons/md";
import {
  motion,
  AnimatePresence,
  Transition,
  HTMLMotionProps,
} from "motion/react";
import { usePlanStore } from "../_store/hook";
import { getFirstChar, removeEmoji } from "@/utils/removeEmoji";
import Image from "next/image";
import AddButton from "@/components/AddButton";
import IconButton from "@/components/IconButton";

const MOTION_ELEMENTS = {
  ICON: "icon",
  TITLE: "title",
  TOGGLE_BUTTON: "toggle_button",
} as const;

type LocationCardProps = {
  id: LocationType["id"];
};

const commonTransition = (damping: number = 30): Transition => ({
  type: "spring",
  stiffness: 500,
  damping,
});

const inputAnimation = (delay: number): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { ...commonTransition, delay },
});

function LocationCard({ id }: LocationCardProps) {
  const location = usePlanStore((state) => state.locations[id]);
  const updateLocation = usePlanStore((state) => state.updateLocation);
  const isExpanded = !usePlanStore((state) =>
    state.closedLocationIds.includes(id)
  );
  const removeLocation = usePlanStore((state) => state.removeLocation);
  const openLocation = usePlanStore((state) => state.openLocation);
  const closeLocation = usePlanStore((state) => state.closeLocation);

  const handleDelete = () => {
    removeLocation(id);
  };

  const handleOpen = () => {
    openLocation(id);
  };

  const handleClose = () => {
    closeLocation(id);
  };

  const getMotionId = (
    key: (typeof MOTION_ELEMENTS)[keyof typeof MOTION_ELEMENTS]
  ) => {
    return `location-card-${id}-${key}`;
  };

  const icon = (
    <motion.div
      layoutId={getMotionId(MOTION_ELEMENTS.ICON)}
      transition={commonTransition()}>
      <EmojiIcon color="primary">
        {getFirstChar(location.title) || "✈️"}
      </EmojiIcon>
    </motion.div>
  );

  return (
    <div className="relative" title={location.title}>
      <motion.div
        layout
        className={clsx(
          "relative w-sm flex flex-col rounded-lg overflow-hidden bg-paper gap-[25px] shadow-md hover:shadow-lg hover:scale-102 transition-all"
        )}>
        <AnimatePresence initial={false} mode="wait">
          {isExpanded && (
            <motion.div
              key="accordion"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}>
              <button
                onClick={handleClose}
                className="w-full h-4 flex justify-center p-5 border-b border-b-border hover:bg-text-secondary/10 transition-colors">
                <motion.span
                  layoutId={getMotionId(MOTION_ELEMENTS.TOGGLE_BUTTON)}
                  transition={commonTransition()}>
                  <MdArrowDropUp className="text-lg text-text-secondary" />
                </motion.span>
              </button>

              <div className="relative flex flex-col gap-6 p-4">
                <div className="relative w-full aspect-video">
                  {/* TODO: サムネイル画像の追加を実装する */}
                  {location.thumbnail ? (
                    <Image
                      fill
                      className="w-full h-full rounded-lg object-cover object-center"
                      src={location.thumbnail}
                      alt={`${location.title}のサムネイル画像`}
                    />
                  ) : (
                    <AddButton className="w-full h-full">
                      サムネイルを追加
                    </AddButton>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-3">
                  {icon}
                  <motion.div
                    layoutId={getMotionId(MOTION_ELEMENTS.TITLE)}
                    transition={commonTransition(45)}
                    className="flex-2">
                    <TextField
                      label="ロケーション名"
                      value={location.title}
                      onChange={(e) =>
                        updateLocation(id, { title: e.target.value })
                      }
                      placeholder="プレースホルダー"
                      autoComplete="off"
                      fullWidth
                    />
                  </motion.div>
                </div>

                <motion.div {...inputAnimation(0.1)}>
                  <TextField
                    label="住所"
                    value={location.address}
                    onChange={(e) =>
                      updateLocation(id, { address: e.target.value })
                    }
                    placeholder="プレースホルダー"
                    autoComplete="off"
                    fullWidth
                  />
                </motion.div>

                <motion.div {...inputAnimation(0.15)}>
                  <TextField
                    label="メモ"
                    value={location.description}
                    onChange={(e) =>
                      updateLocation(id, { description: e.target.value })
                    }
                    placeholder="プレースホルダー"
                    textarea
                    autoComplete="off"
                    fullWidth
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {!isExpanded && (
            <motion.button
              key="header"
              className="flex items-center justify-between p-4"
              onClick={handleOpen}>
              <div className="flex items-center gap-4 min-w-0">
                {icon}
                <motion.p
                  layoutId={getMotionId(MOTION_ELEMENTS.TITLE)}
                  className="truncate"
                  transition={commonTransition(35)}>
                  {removeEmoji(location.title)}
                </motion.p>
              </div>
              <motion.div
                layoutId={getMotionId(MOTION_ELEMENTS.TOGGLE_BUTTON)}
                transition={commonTransition()}>
                <MdArrowDropDown className="text-lg text-text-secondary shrink-0" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="absolute -top-4 -right-4"
            initial={{ opacity: 0, x: 20, rotate: 90 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 20, rotate: 90 }}
            transition={commonTransition()}>
            <IconButton
              onClick={handleDelete}
              color={"error"}
              icon={<MdDelete />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LocationCard;
