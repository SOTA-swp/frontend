"use client";
import Chip from "@/components/Chip";
import CommonButton from "@/components/CommonButton";
import EmojiIcon from "@/components/EmojiIcon";
import FavoriteCounter from "@/components/FavoriteCounter";
import GrowIconButton from "@/components/GrowIconButton";
import IconButton from "@/components/IconButton";
import PlanCard from "@/components/PlanCard";
import Popover from "@/components/popover/Popover";
import usePopover from "@/components/popover/usePopover";
import SectionTitle from "@/components/SectionTitle";
import Selector from "@/components/Selector";
import SelectorItem from "@/components/SelectorItem";
import Tab from "@/components/Tab";
import TextField from "@/components/TextField";
import { createMockPlan } from "@/types/plan";
import { createMockUser } from "@/types/user";
import { motion } from "motion/react";
import React, { useEffect } from "react";
import { MdHome } from "react-icons/md";
import Side from "../(main)/_components/side/Side";
import LocationCard from "@/app/plans/_components/IdeaSpaceView/LocationCard";
import NodeThree from "../plans/_components/NodeView/NodeThree";
import { usePlanStore } from "../plans/_store/hook";
import { MOCK_LOCATIONS } from "../plans/_mock/MOCK_LOCATIONS";
import { MOCK_NODES, MOCK_STRUCTURE } from "../plans/_mock/MOCK_NODES";
import { useAppStore } from "@/store/AppStoreProvider";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import ModalAction from "@/components/modal/ModalAction";
import { toast } from "sonner";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
  const [favoriteCount, setFavoriteCount] = React.useState(0);
  const [text, setText] = React.useState("");
  const [planOpen, setPlanOpen] = React.useState(-1);
  const openModal = useAppStore((state) => state.openModal);
  const closeModal = useAppStore((state) => state.closeModal);
  const { open, anchorEl, handleOpen, handleClose } = usePopover();
  const setNodes = usePlanStore((state) => state.setNodes);
  const setStructure = usePlanStore((state) => state.setStructure);
  const setLocations = usePlanStore((state) => state.setLocations);

  useEffect(() => {
    setLocations(MOCK_LOCATIONS);

    setNodes(MOCK_NODES);
    setStructure(MOCK_STRUCTURE);
  }, [setStructure, setNodes, setLocations]);

  const mockLocation = MOCK_LOCATIONS[0];

  // if (process.env.NODE_ENV !== "development") {
  //   return <div>Not Found</div>;
  // }

  return (
    <div className="mb-25">
      <div className="flex p-4">
        <Side />
        <div>
          <div className="flex gap-2 p-4">
            <Chip color="primary" variant="contain">
              Chip
            </Chip>
            <Chip color="gray" variant="contain">
              Chip
            </Chip>
            <Chip color="accent" variant="contain">
              Chip
            </Chip>
            <Chip color="error" variant="contain">
              Chip
            </Chip>
            <Chip color="gray" variant="outline">
              Chip
            </Chip>
            <Chip color="primary" variant="outline">
              Chip
            </Chip>
            <Chip color="accent" variant="outline">
              Chip
            </Chip>
            <Chip color="error" variant="outline">
              Chip
            </Chip>
          </div>
          <div className="flex gap-2 p-4">
            <Tab
              id={0}
              tabList={[
                {
                  value: "time-line",
                  itemContent: "タイムライン",
                },
                { value: "idea-space", itemContent: "アイデアスペース" },
              ]}
            />
            <Tab
              id={1}
              tabList={[
                { value: "1", itemContent: "タブ1" },
                { value: "2", itemContent: "タブ2" },
                { value: "3", itemContent: "タブ3" },
                { value: "4", itemContent: "タブ4" },
                { value: "5", itemContent: "タブ5" },
              ]}
            />
          </div>
          <div className="flex gap-2 p-4">
            <FavoriteCounter
              clicked={favoriteCount % 2 === 1}
              count={favoriteCount}
              onClick={() => setFavoriteCount(favoriteCount + 1)}
            />
          </div>
          <div className="flex gap-2 p-4">
            <TextField
              label="テキスト"
              value={text}
              textarea
              onChange={(e) => setText(e.target.value)}
              placeholder="プレースホルダー"
              helperText={"ヘルパーテキスト"}
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2 p-4">
            <EmojiIcon>🤓</EmojiIcon>
            <EmojiIcon color="gray">👉</EmojiIcon>
            <EmojiIcon color="accent">🌜</EmojiIcon>
            <EmojiIcon color="error">🤡</EmojiIcon>
            <EmojiIcon color="primary">🌛</EmojiIcon>
          </div>
          <div className="flex gap-2 p-4">
            <Selector
              id="select"
              label="セレクター"
              error
              helperText="ヘルパーテキスト">
              <SelectorItem value={0}>ほげほげ0</SelectorItem>
              <SelectorItem value={1}>ふがふが1</SelectorItem>
              <SelectorItem value={2}>ほげほげ2</SelectorItem>
              <SelectorItem value={3}>ふがふが3</SelectorItem>
              <SelectorItem value={4}>ほげほげ4</SelectorItem>
              <SelectorItem value={5}>ふがふが5</SelectorItem>
            </Selector>
          </div>
          <div className="flex gap-2 p-4">
            <IconButton icon={<MdHome />} disable />
            <IconButton icon={<MdHome />} variant={"iconOnly"} />
            <IconButton icon={<MdHome />} variant={"outline"} />
            <IconButton icon={<MdHome />} variant={"contain"} />
            <IconButton icon={<MdHome />} disable size={"xs"} />
            <IconButton icon={<MdHome />} variant={"iconOnly"} size={"xs"} />
            <IconButton icon={<MdHome />} variant={"outline"} size={"xs"} />
            <IconButton icon={<MdHome />} variant={"contain"} size={"xs"} />
          </div>
          <SectionTitle icon={<MdHome />} color="gray">
            タイトル
          </SectionTitle>
          <SectionTitle icon={<MdHome />} color="primary">
            タイトル
          </SectionTitle>
          <SectionTitle icon={<MdHome />} color="accent">
            タイトル
          </SectionTitle>
          <SectionTitle icon={<MdHome />} color="error">
            タイトル
          </SectionTitle>
          <div className="flex gap-2 p-4">
            <GrowIconButton icon={<MdHome />} color="primary">
              タイトル
            </GrowIconButton>
            <GrowIconButton icon={<MdHome />} color="gray">
              タイトル
            </GrowIconButton>
            <GrowIconButton icon={<MdHome />} color="accent">
              タイトル
            </GrowIconButton>
            <GrowIconButton icon={<MdHome />} color="error">
              タイトル
            </GrowIconButton>
          </div>
          <motion.div layout className="flex gap-4 p-4 items-end">
            {Array.from({ length: 5 }).map((_, i) => (
              <PlanCard
                open={planOpen === i}
                key={i}
                variant={i % 2 === 0 ? "default" : "mini"}
                data={{
                  planData: { favorites: 100, ...createMockPlan(i) },
                  creatorData: createMockUser(i),
                }}
                onOpen={() => setPlanOpen(i)}
                onClose={() => setPlanOpen(-1)}
              />
            ))}
          </motion.div>
          <div className="flex gap-2 p-4">
            <CommonButton
              onClick={() => {
                openModal(
                  <ModalContent closeModal={closeModal}>
                    <ModalTitle>モーダルタイトル</ModalTitle>
                    <div className="px-4">モーダルコンテンツ</div>
                    <ModalAction>
                      <CommonButton
                        modal
                        variant="outline"
                        onClick={closeModal}>
                        キャンセル
                      </CommonButton>
                      <CommonButton
                        modal
                        variant={"outline"}
                        color="accent"
                        onClick={() =>
                          openModal(
                            <ModalContent closeModal={closeModal}>
                              <ModalTitle>複製したモーダル</ModalTitle>
                              <div className="px-4">モーダルコンテンツ</div>
                              <ModalAction>
                                <CommonButton
                                  modal
                                  variant="outline"
                                  onClick={closeModal}>
                                  キャンセル
                                </CommonButton>
                                <CommonButton
                                  modal
                                  color="primary"
                                  onClick={closeModal}>
                                  確認
                                </CommonButton>
                              </ModalAction>
                            </ModalContent>
                          )
                        }>
                        複製
                      </CommonButton>
                      <CommonButton modal onClick={closeModal} color="primary">
                        確認
                      </CommonButton>
                    </ModalAction>
                  </ModalContent>
                );
              }}>
              モーダル
            </CommonButton>
            <CommonButton
              color="error"
              onClick={() => {
                openModal(
                  <ModalContent closeModal={closeModal}>
                    <ModalTitle modalType="error">
                      エラーモーダルタイトル
                    </ModalTitle>
                    <div className="px-4">エラーモーダルコンテンツ</div>
                    <ModalAction>
                      <CommonButton modal onClick={closeModal} color="error">
                        閉じる
                      </CommonButton>
                    </ModalAction>
                  </ModalContent>
                );
              }}>
              エラーモーダル
            </CommonButton>
          </div>
          <div className="flex gap-2 p-4">
            <CommonButton onClick={handleOpen}>ポップオーバー</CommonButton>
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
              ポップオーバー
            </Popover>
          </div>
          <div className="flex gap-2 p-4">
            <CommonButton
              onClick={() => {
                toast.success("トースト通知だよ！");
              }}>
              トースト
            </CommonButton>
            <CommonButton
              onClick={() => toast.error("エラー通知だよ！")}
              color="error">
              エラートースト
            </CommonButton>
            <CommonButton onClick={() => toast.info("情報トーストだよ！")}>
              情報トースト
            </CommonButton>
            <CommonButton
              onClick={() => toast.warning("警告トーストだよ！")}
              color="accent">
              警告トースト
            </CommonButton>
          </div>
          <div className="flex p-4">
            <NodeThree />
          </div>
        </div>
      </div>

      <div className="p-4">
        <LocationCard id={mockLocation.id} />
      </div>
    </div>
  );
};

export default DevPage;
