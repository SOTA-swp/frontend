import PlanType from "@/types/plan";
import UserType from "@/types/user";
import { motion } from "motion/react";
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
  planData: PlanType & { favorites: number };
  userData: UserType;
  onClose?: () => void;
  onOpen?: () => void;
};

function PlanCard({
  open = false,
  variant = "default",
  planData,
  userData,
  onClose,
  onOpen,
}: PlanCardProps) {
  const getId = (key: string | number) => {
    return `plan-card-${planData.id}-${key}`;
  };

  return (
    <>
      {!open &&
        (variant === "default" ? (
          // 大きめのカード
          <motion.div
            layoutId={getId(MOTION_ELEMENTS.CONTAINER)}
            whileHover={{ scale: 1.02 }}
            className="relative min-w-[330px] min-h-[200px] bg-paper cursor-pointer rounded-lg ">
            <motion.button
              // TODO: 編集画面ができたら編集画面に飛ばす処理を渡す
              onClick={onOpen}
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
          <></>
        ))}

      {/* 開いた時 */}
      {open && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center "
            style={{ zIndex: LAYER.CARD }}
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
                    userData={userData}
                  />
                  {/* TODO: 削除・編集ができるようになったらモーダルの表示につなげる */}
                  <div className="flex gap-8">
                    <GrowIconButton icon={<MdDelete />} color="error">
                      計画を削除
                    </GrowIconButton>
                    <div className="flex gap-2">
                      {/* TODO: 権限の仕様が決まったら権限に応じて閲覧を追加、編集を削除する */}
                      <GrowIconButton icon={<MdDownload />}>
                        計画をインポート
                      </GrowIconButton>
                      <GrowIconButton icon={<MdEditNote />}>
                        基本情報を編集
                      </GrowIconButton>
                      <GrowIconButton icon={<MdEdit />}>
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
          </div>
        </>
      )}
    </>
  );
}

export default PlanCard;
