"use client";
import Chip from "@/components/Chip";
import FavoriteCounter from "@/components/FavoriteCounter";
import Tab from "@/components/Tab";
import TextField from "@/components/TextField";
import React from "react";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
  const [favoriteCount, setFavoriteCount] = React.useState(0);
  const [text, setText] = React.useState("");

  if (process.env.NODE_ENV !== "development") {
    return <div>Not Found</div>;
  }

  return (
    <div>
      Dev Page
      <div className="flex gap-2 p-4">
        <Chip color="primary" variant="contain">
          Chip
        </Chip>
        <Chip color="gray" variant="contain">
          Chip
        </Chip>
        <Chip color="gray" variant="outline">
          Chip
        </Chip>
        <Chip color="primary" variant="outline">
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
    </div>
  );
};

export default DevPage;
