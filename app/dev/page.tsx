"use client";
import Chip from "@/components/Chip";
import EmojiIcon from "@/components/EmojiIcon";
import FavoriteCounter from "@/components/FavoriteCounter";
import GrowIconButton from "@/components/GrowIconButton";
import IconButton from "@/components/IconButton";
import PlanCard from "@/components/PlanCard";
import SectionTitle from "@/components/SectionTitle";
import Selector from "@/components/Selector";
import SelectorItem from "@/components/SelectorItem";
import Tab from "@/components/Tab";
import TextField from "@/components/TextField";
import { createMockPlan } from "@/types/plan";
import { createMockUser } from "@/types/user";
import { motion } from "motion/react";
import React from "react";
import { MdHome } from "react-icons/md";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
  const [favoriteCount, setFavoriteCount] = React.useState(0);
  const [text, setText] = React.useState("");
  const [planOpen, setPlanOpen] = React.useState(-1);

  if (process.env.NODE_ENV !== "development") {
    return <div>Not Found</div>;
  }

  return (
    <div className="mb-[100px]">
      Dev Page
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
        <GrowIconButton icon={<MdHome />} color="primary" absolute>
          タイトル
        </GrowIconButton>
        <GrowIconButton icon={<MdHome />} color="gray" absolute>
          タイトル
        </GrowIconButton>
        <GrowIconButton icon={<MdHome />} color="accent" absolute>
          タイトル
        </GrowIconButton>
        <GrowIconButton icon={<MdHome />} color="error" absolute>
          タイトル
        </GrowIconButton>
      </div>
      <motion.div layout className="flex gap-4 p-4 items-end">
        {Array.from({ length: 5 }).map((_, i) => (
          <PlanCard
            open={planOpen === i}
            key={i}
            variant={i % 2 === 0 ? "default" : "mini"}
            planData={{ favorites: 100, ...createMockPlan(i) }}
            userData={createMockUser(i)}
            onOpen={() => setPlanOpen(i)}
            onClose={() => setPlanOpen(-1)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default DevPage;
