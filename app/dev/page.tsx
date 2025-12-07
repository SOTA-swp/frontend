"use client";
import Chip from "@/components/Chip";
import CommonButton from "@/components/CommonButton";
import EmojiIcon from "@/components/EmojiIcon";
import FavoriteCounter from "@/components/FavoriteCounter";
import GrowIconButton from "@/components/GrowIconButton";
import IconButton from "@/components/IconButton";
import { useModalStore } from "@/components/modal/modalStore";
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
import { createMockLocation } from "@/types/location";
import LocationCard from "@/components/LocationCard";
import Node from "../plans/_components/ProcessNode/Node";
import { createMockNode } from "@/types/node";
import { useNodeStore } from "../plans/_store/nodeStore";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
  const [favoriteCount, setFavoriteCount] = React.useState(0);
  const [text, setText] = React.useState("");
  const [planOpen, setPlanOpen] = React.useState(-1);
  const { openModal, closeModal } = useModalStore();
  const { open, anchorEl, handleOpen, handleClose } = usePopover();
  const { setNodes } = useNodeStore();

  useEffect(() => {
    setNodes([
      createMockNode(0, { id: "0" }),
      createMockNode(1, { id: "1", parentId: "0" }),
      createMockNode(2, { id: "2", parentId: "0" }),
      createMockNode(3, { nodeType: "move", id: "3", parentId: "0" }),
      createMockNode(4, { nodeType: "move", id: "4", parentId: "0" }),
      createMockNode(5, { nodeType: "move", id: "5", parentId: "0" }),
    ]);
  }, [setNodes]);

  const mockLocation = createMockLocation(1);

  if (process.env.NODE_ENV !== "development") {
    return <div>Not Found</div>;
  }

  return (
    <div className="mb-[100px]">
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
                  label: "time-line",
                  itemContent: "タイムライン",
                },
                { label: "idea-space", itemContent: "アイデアスペース" },
              ]}
            />
            <Tab
              id={1}
              tabList={[
                { label: "1", itemContent: "タブ1" },
                { label: "2", itemContent: "タブ2" },
                { label: "3", itemContent: "タブ3" },
                { label: "4", itemContent: "タブ4" },
                { label: "5", itemContent: "タブ5" },
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
                openModal({
                  modalType: "default",
                  title: "モーダルテスト",
                  content:
                    "こちらはモーダルテストです。こちらはモーダルテストです。こちらはモーダルテストです。",
                  actions: [
                    <CommonButton
                      key={"copy"}
                      color="accent"
                      variant="outline"
                      onClick={() =>
                        openModal({
                          modalType: "default",
                          title: "複製テスト",
                          content: "モーダルが複製されました！",
                          actions: [
                            <CommonButton
                              key={"close"}
                              variant="outline"
                              onClick={closeModal}
                              fullWidth>
                              閉じる
                            </CommonButton>,
                          ],
                        })
                      }
                      fullWidth>
                      複製
                    </CommonButton>,
                    <CommonButton
                      key={"no"}
                      onClick={closeModal}
                      variant="outline"
                      fullWidth>
                      いいえ
                    </CommonButton>,
                    <CommonButton key={"yes"} onClick={closeModal} fullWidth>
                      はい
                    </CommonButton>,
                  ],
                });
              }}>
              モーダル
            </CommonButton>
            <CommonButton
              color="error"
              onClick={() =>
                openModal({
                  modalType: "error",
                  title: "エラーモーダル",
                  content: "エラーモーダルのテストです",
                  actions: [],
                })
              }>
              エラーモーダル
            </CommonButton>
          </div>
          <div className="flex gap-2 p-4">
            <CommonButton onClick={(e) => handleOpen(e.currentTarget)}>
              ポップオーバー
            </CommonButton>
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
              ポップオーバー
            </Popover>
          </div>
          <div className="flex gap-2 p-4">
            <Node id="0" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <LocationCard
          location={mockLocation}
          onTitleChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
          onAddressChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
          onDescriptionChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};

export default DevPage;
