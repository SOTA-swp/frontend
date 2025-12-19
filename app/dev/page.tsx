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
import { createMockNode } from "@/types/node";
import { useNodeStore } from "../plans/_store/nodeStore";
import { useLocationStore } from "../plans/_store/locationStore";
import NodeThree from "../plans/_components/NodeThree";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
  const [favoriteCount, setFavoriteCount] = React.useState(0);
  const [text, setText] = React.useState("");
  const [planOpen, setPlanOpen] = React.useState(-1);
  const { openModal, closeModal } = useModalStore();
  const { open, anchorEl, handleOpen, handleClose } = usePopover();
  const { setNodes, setStructure } = useNodeStore();
  const { setLocations } = useLocationStore();

  useEffect(() => {
    setLocations([
      createMockLocation(0, {
        id: "0",
        title:
          "👨🏿‍🦱ああああああああああああああああああああああああああああああああああああああああああああ",
      }),
      createMockLocation(1, { id: "1" }),
      createMockLocation(2, { id: "2" }),
    ]);

    setNodes([
      createMockNode(0, { id: "0" }),
      createMockNode(1, { id: "1" }),
      createMockNode(2, { id: "2" }),
      createMockNode(3, { id: "3", nodeType: "move" }),
      createMockNode(4, { id: "4", nodeType: "move" }),
      createMockNode(5, { id: "5", nodeType: "move" }),
      createMockNode(6, { id: "6", nodeType: "move" }),
      createMockNode(7, { id: "7", nodeType: "move" }),
      createMockNode(8, { id: "8", nodeType: "move" }),
      createMockNode(9, { id: "9", nodeType: "location", locationId: "0" }),
      createMockNode(10, { id: "10", nodeType: "location", locationId: "1" }),
      createMockNode(11, { id: "11", nodeType: "location", locationId: "2" }),
      createMockNode(12, { id: "12", nodeType: "location", locationId: "0" }),
      createMockNode(13, { id: "13", nodeType: "location", locationId: "1" }),
      createMockNode(14, { id: "14", nodeType: "location", locationId: "2" }),
      createMockNode(15, { id: "15" }),
      createMockNode(16, { id: "16", nodeType: "move" }),
      createMockNode(17, { id: "17", nodeType: "move" }),
      createMockNode(18, { id: "18", nodeType: "location", locationId: "0" }),
      createMockNode(19, { id: "19", nodeType: "location", locationId: "1" }),
    ]);
    setStructure({
      "0": ["1", "2", "3", "8", "9", "10"],
      "1": ["4", "5", "11", "12"],
      "2": ["6", "7", "13", "14", "15"],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
      "8": [],
      "9": [],
      "10": [],
      "12": [],
      "13": [],
      "14": [],
      "15": ["16", "17", "18", "19"],
    });
  }, [setStructure, setNodes, setLocations]);

  const mockLocation = createMockLocation(1);

  // if (process.env.NODE_ENV !== "development") {
  //   return <div>Not Found</div>;
  // }

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
          <div className="flex p-4">
            <NodeThree />
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
