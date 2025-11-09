import Chip from "@/components/Chip";
import Tab from "@/components/Tab";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
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
    </div>
  );
};

export default DevPage;
