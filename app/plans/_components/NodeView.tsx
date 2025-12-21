import { ReactNode, useState } from "react";
import NodeThree from "./NodeThree";
import ViewWrapper from "./ViewWrapper";
import { MdDirectionsCar, MdFolderOpen, MdLocationPin } from "react-icons/md";
import IconButton from "@/components/IconButton";
import AddButton from "./AddButton";

const ADD_MODES = {
  PROCESS: "process",
  MOVE: "move",
  LOCATION: "location",
} as const;

type AddModeType = (typeof ADD_MODES)[keyof typeof ADD_MODES];

function NodeViewAddButton() {
  const [addMode, setAddMode] = useState<AddModeType>(ADD_MODES.PROCESS);

  const handleModeChange = (mode: AddModeType) => {
    setAddMode(mode);
  };

  const addButtonChildrenData: {
    mode: AddModeType;
    title: string;
    icon: ReactNode;
  }[] = [
    {
      mode: ADD_MODES.PROCESS,
      title: "プロセス",
      icon: <MdFolderOpen />,
    },
    {
      mode: ADD_MODES.MOVE,
      title: "移動",
      icon: <MdDirectionsCar />,
    },
    {
      mode: ADD_MODES.LOCATION,
      title: "ロケーション",
      icon: <MdLocationPin />,
    },
  ];
  const addButtonChildrenNodes: ReactNode[] = addButtonChildrenData.map(
    (data) => (
      <IconButton
        {...data}
        key={data.mode}
        onClick={() => handleModeChange(data.mode)}
        size={"md"}
        variant={addMode === data.mode ? "contain" : "outline"}
      />
    )
  );
  return <AddButton childButtons={addButtonChildrenNodes} />;
}

function NodeView() {
  return (
    <ViewWrapper overflow="auto" outerElement={<NodeViewAddButton />}>
      <NodeThree />
    </ViewWrapper>
  );
}

export default NodeView;
