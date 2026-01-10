"use client";
import { PlanWithDetails } from "@/types/plan";
import { AnimatePresence, motion } from "motion/react";
import FavoriteCounter from "../../../components/FavoriteCounter";
import { formatDataDisplay } from "@/utils/data";
import LAYER from "@/consts/LAYER";
import Chip from "../../../components/Chip";
import UserLink from "../../../components/UserLink";
import GrowIconButton from "../../../components/GrowIconButton";
import {
  MdClose,
  MdDelete,
  MdDownload,
  MdEdit,
  MdEditNote,
  MdKeyboardArrowDown,
  MdNavigateNext,
} from "react-icons/md";
import IconButton from "../../../components/IconButton";
import { startTransition, useOptimistic } from "react";
import { addLike, removeLike } from "@/lib/api/likes";
import { usePathname, useRouter } from "next/navigation";
import { PLAN_ROLE } from "@/consts/PLAN_ROLE";
import PATH from "@/consts/PATH";
import { useOpenPlanCardStore } from "../_store/OpenPlanCardStoreProvider";
import { getHueFromString } from "@/utils/color";
import Link from "next/link";
import { getFirstChar } from "@/utils/removeEmoji";
import { useAppStore } from "@/store/AppStoreProvider";
import EditPlanInfoModal from "@/app/plans/_components/EditPlanInfoModal";
import { EditPlanFormData } from "@/app/plans/_types/EditPlanFormData";
import RemovePlanModal from "./RemovePlanModal";

const MOTION_ELEMENTS = {
  CONTAINER: "container",
  IMAGE: "image",
  INFO: "info",
  TITLE: "title",
  FAVORITE: "favorite",
  CHAR: "char",
} as const;

type MotionElement = (typeof MOTION_ELEMENTS)[keyof typeof MOTION_ELEMENTS];

type PlanCardProps = {
  variant?: "default" | "mini";
  data: PlanWithDetails;
  layoutId?: string;
};

function PlanCard({ variant = "default", data, layoutId }: PlanCardProps) {
  const { planData, creatorData } = data;
  const { role } = planData;
  const [optimisticPlanData, setOptimisticPlanData] = useOptimistic(
    planData,
    (state, newData: EditPlanFormData) => ({
      ...state,
      ...newData,
    })
  );
  const wrapId = `${layoutId}-${planData.id}`;
  const open = useOpenPlanCardStore((state) => state.openPlanCardId === wrapId);
  const setOpenPlanCardId = useOpenPlanCardStore(
    (state) => state.setOpenPlanCardId
  );
  const [optimisticLike, addOptimisticLike] = useOptimistic(
    {
      count: planData.favorites,
      hasLiked: planData.hasLiked,
    },
    (state, newIsLiked: boolean) => ({
      count: state.count + (newIsLiked ? 1 : -1),
      hasLiked: newIsLiked,
    })
  );
  const path = usePathname();
  const router = useRouter();
  const openModal = useAppStore((state) => state.openModal);

  const getId = (key: MotionElement) => {
    return `plan-card-${layoutId}-${planData.id}-${key}`;
  };

  const handleOpen = () => {
    setOpenPlanCardId(wrapId);
  };

  const handleClose = () => {
    setOpenPlanCardId(null);
  };

  // TODO: レスポンスが返るようになったらちゃんとUIに反映されているか確認する
  const handleLike = async () => {
    const nextIsLiked = !optimisticLike.hasLiked;
    startTransition(async () => {
      addOptimisticLike(nextIsLiked);
      try {
        if (nextIsLiked) {
          await addLike(planData.id, path);
        } else {
          await removeLike(planData.id, path);
        }
      } catch (_) {
        console.error("いいねの更新に失敗しました");
      }
    });
  };

  const handlePlanEdit = () => {
    router.push(PATH.PLAN_EDIT(planData.id));
  };

  const handlePlanInfoEdit = () => {
    openModal(
      <EditPlanInfoModal
        planId={planData.id}
        planData={{ ...planData }}
        onEdit={(data) => {
          startTransition(() => {
            setOptimisticPlanData(data);
          });
        }}
        path={path}
      />
    );
  };

  const handlePlanDelete = () => {
    openModal(<RemovePlanModal planId={planData.id} planTitle={title} />);
  };

  const likeContent = (
    <FavoriteCounter
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
      count={optimisticLike.count}
      hasLiked={optimisticLike.hasLiked}
    />
  );

  const title = optimisticPlanData.title;
  const description = optimisticPlanData.description;
  const isPublic = optimisticPlanData.isPublic;

  const hue = getHueFromString(planData.id, 100, 250);
  const background = `linear-gradient(45deg, hsl(${hue}, 60%, 60%), hsl(${hue + 40}, 70%, 70%))`;

  const linkHref =
    role === PLAN_ROLE.OWNER || role === PLAN_ROLE.MEMBER
      ? PATH.PLAN_EDIT(planData.id)
      : PATH.PLAN_VIEW(planData.id);
  const linkMessage =
    role === PLAN_ROLE.OWNER || role === PLAN_ROLE.MEMBER ? "編集へ" : "閲覧へ";

  const firstChar = getFirstChar(title);

  return (
    <>
      {open && <div />}
      {variant === "default"
        ? // 大きめのカード
          !open && (
            <motion.div
              layoutId={getId(MOTION_ELEMENTS.CONTAINER)}
              className="relative flex flex-col bg-paper cursor-pointer rounded-lg aspect-video overflow-clip">
              <motion.div
                layoutId={getId(MOTION_ELEMENTS.IMAGE)}
                style={{ background: background }}
                className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden "></motion.div>

              {/* 上部 */}
              <motion.div
                whileHover={"hover"}
                className="relative z-10 flex-1 flex items-center justify-center text-paper text-5xl overflow-clip ">
                <Link href={linkHref} className="absolute inset-0" />

                {/* 文字部分 */}
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    layoutId={getId(MOTION_ELEMENTS.CHAR)}
                    className="flex items-center justify-center">
                    {firstChar}
                  </motion.div>
                </div>

                {/* ホバー時に出てくるメッセージ */}
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  variants={{ hover: { opacity: 1, width: "" } }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="bg-primary h-full shadow-md">
                  <div className="flex h-full flex-col items-center justify-center p-2">
                    <MdNavigateNext className="text-[2rem]" />
                    <p className="whitespace-nowrap text-sm">{linkMessage}</p>
                  </div>
                </motion.div>

                <div className="absolute p-2 bottom-0 text-2xl opacity-80">
                  <MdKeyboardArrowDown />
                </div>
              </motion.div>

              {/* 下部 */}
              <motion.button
                onClick={handleOpen}
                layoutId={getId(MOTION_ELEMENTS.INFO)}
                className="relative z-10 flex items-end justify-between bg-paper border border-primary p-2 pl-3 rounded-b-lg"
                whileHover={{
                  paddingTop: "18px",
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}>
                <div className="text-start min-w-0">
                  <p className="text-[12px] text-text-secondary truncate">
                    {formatDataDisplay(planData.createdAt)}
                  </p>
                  <motion.h3
                    layoutId={getId(MOTION_ELEMENTS.TITLE)}
                    className="text-text-primary truncate mt-1 pr-16">
                    {title}
                  </motion.h3>
                </div>
              </motion.button>
              <motion.div
                layoutId={getId(MOTION_ELEMENTS.FAVORITE)}
                className="absolute z-10 bottom-3 right-3">
                {likeContent}
              </motion.div>
            </motion.div>
          )
        : // 小さめのカード
          !open && (
            <motion.div
              layoutId={getId(MOTION_ELEMENTS.CONTAINER)}
              initial={"initial"}
              whileHover={"hover"}
              variants={{
                hover: { scale: 1.05 },
              }}
              className="relative aspect-video flex flex-col items-center justify-center bg-paper rounded-lg  cursor-pointer">
              {/* 開くための判定 */}
              <button className="absolute inset-0 z-10" onClick={handleOpen} />

              {/* いいね部分 */}
              <motion.div
                layoutId={getId(MOTION_ELEMENTS.FAVORITE)}
                className="absolute -top-2 -right-2 z-10">
                {likeContent}
              </motion.div>

              {/* 背景部分 */}
              <motion.div
                layoutId={getId(MOTION_ELEMENTS.IMAGE)}
                style={{ background: background }}
                className="absolute inset-0 bg-cover bg-center rounded-lg "
              />

              {/* 文字部分 */}
              <motion.div
                layoutId={getId(MOTION_ELEMENTS.CHAR)}
                className="flex-1 relative flex items-center justify-center text-3xl text-paper">
                {firstChar}
              </motion.div>

              {/* 詳細部分 */}
              <motion.div
                onClick={handleOpen}
                layoutId={getId(MOTION_ELEMENTS.INFO)}
                variants={{
                  initial: { opacity: 0, height: 0 },
                  hover: { opacity: 1, height: "" },
                }}
                className="self-stretch select-none">
                <motion.p
                  layoutId={getId(MOTION_ELEMENTS.TITLE)}
                  className="relative text-xs bg-paper text-left px-2 py-1 truncate text-text-secondary rounded-lg m-2 mt-0">
                  {title}
                </motion.p>
              </motion.div>
            </motion.div>
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
              onClick={handleClose}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                layoutId={getId(MOTION_ELEMENTS.CONTAINER)}
                className="relative min-w-200 max-w-225 min-h-112.5 max-h-125 flex flex-col "
                style={{ zIndex: LAYER.CARD + 1 }}>
                <motion.div
                  layoutId={getId(MOTION_ELEMENTS.IMAGE)}
                  style={{ background: background }}
                  className="absolute inset-0 bg-cover bg-center rounded-lg"
                />

                <motion.div
                  whileHover={"hover"}
                  className="relative flex-1 flex items-center justify-center overflow-clip select-none">
                  <Link href={linkHref} className="absolute z-10 inset-0" />
                  <motion.div className="flex-1 flex items-center justify-center">
                    <motion.div
                      layoutId={getId(MOTION_ELEMENTS.CHAR)}
                      variants={{
                        hover: {
                          x: -100,
                        },
                      }}
                      className="text-7xl text-paper">
                      {firstChar}
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    variants={{ hover: { opacity: 1, x: 0 } }}
                    className="absolute flex flex-col items-center justify-center right-5 bg-primary text-paper shadow-md w-[15%] aspect-square rounded-full">
                    <MdNavigateNext className="text-5xl" />
                    <p>{linkMessage}</p>
                  </motion.div>
                </motion.div>

                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  layoutId={getId(MOTION_ELEMENTS.INFO)}
                  className="m-3 mt-0 bg-paper/80 backdrop-blur-md p-4 rounded-lg border border-primary shadow-lg ">
                  <div className="flex justify-between">
                    <div className="flex items-end gap-2">
                      <p className="text-[14px] text-text-secondary truncate">
                        {formatDataDisplay(planData.createdAt)}
                      </p>
                      <Chip
                        variant="outline"
                        color={isPublic ? "primary" : "gray"}>
                        ・{isPublic ? "公開中" : "非公開"}
                      </Chip>
                    </div>
                    <motion.div layoutId={getId(MOTION_ELEMENTS.FAVORITE)}>
                      {likeContent}
                    </motion.div>
                  </div>
                  <motion.h3
                    layoutId={getId(MOTION_ELEMENTS.TITLE)}
                    className="mt-2 text-xl text-text-primary mb-1">
                    {title}
                  </motion.h3>
                  <p
                    className="text-text-secondary max-h-20 overflow-auto pb-5 whitespace-pre"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, black 50%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 50%, transparent 100%)",
                    }}>
                    {description}
                  </p>
                  <div className="mt-6 flex justify-between">
                    <UserLink
                      enableEmail={false}
                      rightIcon={false}
                      userData={creatorData}
                    />
                    <div className="flex gap-8">
                      {role === PLAN_ROLE.OWNER && (
                        <GrowIconButton
                          onClick={handlePlanDelete}
                          icon={<MdDelete />}
                          color="error"
                          absolute>
                          計画を削除
                        </GrowIconButton>
                      )}
                      <div className="flex gap-2">
                        <GrowIconButton icon={<MdDownload />} absolute>
                          計画をインポート
                        </GrowIconButton>
                        {role === PLAN_ROLE.OWNER && (
                          <GrowIconButton
                            onClick={handlePlanInfoEdit}
                            icon={<MdEditNote />}
                            absolute>
                            基本情報を編集
                          </GrowIconButton>
                        )}
                        {(role === PLAN_ROLE.OWNER ||
                          role === PLAN_ROLE.MEMBER) && (
                          <GrowIconButton
                            onClick={handlePlanEdit}
                            icon={<MdEdit />}
                            absolute>
                            計画を編集
                          </GrowIconButton>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
                <IconButton
                  onClick={handleClose}
                  icon={<MdClose />}
                  color={"gray"}
                  variant={"iconOnly"}
                  className="absolute top-2 right-2 z-20"
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
