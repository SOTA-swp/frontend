"use client";
import { PlanWithDetailsType } from "@/types/plan";
import { AnimatePresence, motion } from "motion/react";
import FavoriteCounter from "./FavoriteCounter";
import subTimestamp from "@/utils/subTimestamp";
import LAYER from "@/consts/LAYER";
import Chip from "./Chip";
import UserIcon from "./UserIcon";
import GrowIconButton from "./GrowIconButton";
import {
  MdClose,
  MdDelete,
  MdDownload,
  MdEdit,
  MdEditNote,
} from "react-icons/md";
import IconButton from "./IconButton";

const MOTION_ELEMENTS = {
  CONTAINER: "container",
  IMAGE: "image",
  INFO: "info",
  TITLE: "title",
  FAVORITE: "favorite",
} as const;

type PlanCardProps = {
  variant?: "default" | "mini";
  open?: boolean;
  data: PlanWithDetailsType;
  layoutId?: string;
  onJump?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
};

function PlanCard({
  open = false,
  variant = "default",
  data,
  layoutId,
  onJump,
  onClose,
  onOpen,
}: PlanCardProps) {
  const { planData, creatorData } = data;

  const getId = (key: string | number) => {
    return `plan-card-${layoutId}-${planData.id}-${key}`;
  };

  return (
    <>
      {variant === "default" ? (
        // 大きめのカード
        <motion.div
          layoutId={getId(MOTION_ELEMENTS.CONTAINER)}
          whileHover={{ scale: 1.02 }}
          className="relative  bg-paper cursor-pointer rounded-lg aspect-video">
          <motion.button
            onClick={onJump}
            layoutId={getId(MOTION_ELEMENTS.IMAGE)}
            // TODO: サムネイルの仕様が決まったら修正
            style={{ backgroundImage: `url(${"/mock/img/thumbnail.jpg"})` }}
            className="absolute inset-0 bg-cover bg-center rounded-lg "
          />
          <motion.button
            onClick={onOpen}
            layoutId={getId(MOTION_ELEMENTS.INFO)}
            className="absolute bottom-0 left-0 w-full flex items-end justify-between bg-paper border border-primary p-2 pl-3 rounded-lg"
            whileHover={{
              paddingTop: "18px",
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }}>
            <div className="text-start min-w-0">
              <p className="text-[12px] text-text-secondary truncate">
                {subTimestamp(planData.createdAt)}
              </p>
              <motion.h3
                layoutId={getId(MOTION_ELEMENTS.TITLE)}
                className="text-text-primary truncate mt-1">
                {planData.title}
              </motion.h3>
            </div>
          </motion.button>
          <motion.div
            layoutId={getId(MOTION_ELEMENTS.FAVORITE)}
            className="absolute top-2 right-2">
            {/* TODO: いいねしたときの処理をどこから渡すか考える */}
            <FavoriteCounter count={planData.favorites} />
          </motion.div>
        </motion.div>
      ) : (
        // 小さめのカード
        <motion.button
          onClick={onOpen}
          layoutId={getId(MOTION_ELEMENTS.CONTAINER)}
          whileHover={{ scale: 1.05 }}
          className="relative w-[250px] h-20 bg-paper rounded-lg border border-border">
          <motion.div
            layoutId={getId(MOTION_ELEMENTS.IMAGE)}
            style={{ backgroundImage: `url(${"/mock/img/thumbnail.jpg"})` }}
            className="absolute inset-0 bg-cover bg-center rounded-lg "
          />
          <motion.div
            layoutId={getId(MOTION_ELEMENTS.INFO)}
            className="absolute top-0 right-0 flex flex-col text-start px-2 justify-center w-[60%] h-full bg-paper rounded-r-lg rounded-l-none">
            <p className="text-[12px] text-text-secondary truncate">
              {subTimestamp(planData.createdAt)}
            </p>
            <motion.h3
              layoutId={getId(MOTION_ELEMENTS.TITLE)}
              className="text-text-primary truncate mt-1">
              {planData.title}
            </motion.h3>
          </motion.div>
        </motion.button>
      )}

      {/* 開いた時 */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0"
              style={{ zIndex: LAYER.CARD }}
              initial={{
                opacity: 0,
                backdropFilter: "blur(0px) brightness(100%)",
              }}
              animate={{
                opacity: 1,
                backdropFilter: "blur(2px) brightness(90%)",
              }}
              exit={{
                opacity: 0,
                backdropFilter: "blur(0px) brightness(100%)",
              }}
            />
            <motion.div
              key={"card"}
              className="fixed inset-0 flex items-center justify-center"
              style={{ zIndex: LAYER.CARD + 1 }}
              onClick={onClose}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                layoutId={getId(MOTION_ELEMENTS.CONTAINER)}
                className="relative min-w-[800px] max-w-[900px] min-h-[450px] max-h-[500px]"
                style={{ zIndex: LAYER.CARD + 1 }}>
                <motion.div
                  layoutId={getId(MOTION_ELEMENTS.IMAGE)}
                  style={{
                    // TODO: サムネイルの仕様が決まったら修正
                    backgroundImage: `url(${"/mock/img/thumbnail.jpg"})`,
                  }}
                  className="absolute inset-0 bg-cover bg-center rounded-lg border border-primary"
                />
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  layoutId={getId(MOTION_ELEMENTS.INFO)}
                  className="absolute bottom-3 inset-x-3 bg-paper/80 backdrop-blur-md p-4 rounded-lg border border-primary shadow-lg ">
                  <div className="flex justify-between">
                    <div className="flex items-end gap-2">
                      <p className="text-[14px] text-text-secondary truncate">
                        {subTimestamp(planData.createdAt)}
                      </p>
                      <Chip variant="outline" color="primary">
                        ・{planData.isPublic ? "公開中" : "非公開"}
                      </Chip>
                    </div>
                    <motion.div layoutId={getId(MOTION_ELEMENTS.FAVORITE)}>
                      {/* TODO: いいねしたときの処理をどこから渡すか考える */}
                      <FavoriteCounter count={planData.favorites} />
                    </motion.div>
                  </div>
                  <motion.h3
                    layoutId={getId(MOTION_ELEMENTS.TITLE)}
                    className="mt-2 text-xl text-text-primary mb-1">
                    {planData.title}
                  </motion.h3>
                  <p className="text-text-secondary">{planData.description}</p>
                  <div className="mt-6 flex justify-between">
                    <UserIcon
                      enableEmail={false}
                      rightIcon={false}
                      userData={creatorData}
                    />
                    {/* TODO: 削除・編集ができるようになったらモーダルの表示につなげる */}
                    <div className="flex gap-8">
                      <GrowIconButton
                        icon={<MdDelete />}
                        color="error"
                        absolute>
                        計画を削除
                      </GrowIconButton>
                      <div className="flex gap-2">
                        {/* TODO: 権限の仕様が決まったら権限に応じて閲覧を追加、編集を削除する */}
                        <GrowIconButton icon={<MdDownload />} absolute>
                          計画をインポート
                        </GrowIconButton>
                        <GrowIconButton icon={<MdEditNote />} absolute>
                          基本情報を編集
                        </GrowIconButton>
                        <GrowIconButton icon={<MdEdit />} absolute>
                          計画を編集
                        </GrowIconButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <IconButton
                  onClick={onClose}
                  icon={<MdClose />}
                  variant={"iconOnly"}
                  className="absolute top-2 right-2"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default PlanCard;
