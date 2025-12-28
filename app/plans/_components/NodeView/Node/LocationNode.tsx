"use client";
import EmojiIcon from "@/components/EmojiIcon";
import NodeData from "@/types/node";
import TimeContent from "./TimeContent";
import EditElement from "./EditElement";
import TextField from "@/components/TextField";
import { getFirstChar, isEmoji, removeEmoji } from "@/utils/removeEmoji";
import clsx from "clsx";
import styles from "./styles.module.css";
import { usePlanStore } from "../../../_store/hook";
import { useInlineEdit } from "@/app/plans/_hooks/useInlineEdit";
import usePopover from "@/components/popover/usePopover";
import Popover from "@/components/popover/Popover";
import LocationSelector from "./LocationSelector";

type LocationNodeProps = NodeData;

function LocationNode({ id, locationId, name }: LocationNodeProps) {
  const updateNode = usePlanStore((state) => state.updateNode);
  const location = usePlanStore((state) => state.locations[locationId]);
  const { isEditing, handleOnEditing, inlineEditInputHandlers } =
    useInlineEdit();
  const {
    open: openSelector,
    anchorEl: selectorAnchorEl,
    handleOpen: handleSelectorOpen,
    handleClose: handleSelectorClose,
  } = usePopover();
  const isReadOnly = usePlanStore((state) => state.isReadOnly);

  const handleNameChange = (value: string) => {
    updateNode(id, { name: value });
  };

  const isLocationMissing = !location;
  const emoji = (() => {
    if (isLocationMissing) return "❗️"; // ロケーションが見つからない場合のアイコン
    const nameFirstChar = getFirstChar(name || "");
    const locationTitleFirstChar = getFirstChar(location.title);
    if (isEmoji(nameFirstChar)) return nameFirstChar; // カスタム名の最初の文字が絵文字の場合はそれを使用
    if (isEmoji(locationTitleFirstChar)) return locationTitleFirstChar; // ロケーションのタイトルの最初の文字が絵文字の場合はそれを使用
    return nameFirstChar || locationTitleFirstChar; // それ以外はカスタム名の最初の文字、なければロケーションのタイトルの最初の文字を使用
  })();
  const title = (() => {
    if (isLocationMissing) return "ロケーションが見つかりません"; // ロケーションが見つからない場合のタイトル
    if (name) return removeEmoji(name); // カスタム名がある場合はそれをタイトルに
    if (!location.title) return "タイトル未設定"; // ロケーションのタイトルが空の場合
    return removeEmoji(location.title); // それ以外はロケーションのタイトルを表示
  })();
  const smallMessage = (() => {
    if (isLocationMissing) return "ロケーションを指定してください"; // ロケーションが見つからない場合のメッセージ
    if (name) return removeEmoji(location.title); // カスタム名がある場合はロケーションのタイトルを表示
    return location.address; // カスタム名がない場合はロケーションの住所を表示
  })();

  const changeMessage = isReadOnly ? "" : "ロケーションを変更";

  return (
    <div className="flex items-center justify-between">
      {!isReadOnly && (
        <Popover
          open={openSelector}
          anchorEl={selectorAnchorEl}
          onClose={handleSelectorClose}
          placement="top-start">
          <LocationSelector nodeId={id} onClose={handleSelectorClose} />
        </Popover>
      )}

      <div
        className={clsx("flex items-center gap-2 min-w-0", styles.content)}
        title={name}>
        <button
          onClick={handleSelectorOpen}
          title={changeMessage}
          className="hover:scale-105 hover:rotate-12 transition-all">
          <EmojiIcon
            size={"lg"}
            color={isLocationMissing ? "error" : "primary"}>
            {emoji}
          </EmojiIcon>
        </button>
        <div className="flex flex-col flex-1 min-w-0">
          <EditElement
            isEditing={isEditing}
            onClick={handleOnEditing}
            editElement={
              <TextField
                label="ロケーション名"
                value={name}
                placeholder={title}
                onChange={(e) => handleNameChange(e.target.value)}
                fullWidth
                className="field-sizing-fixed"
                {...inlineEditInputHandlers}
              />
            }
            readElement={<p className="truncate min-h-4 min-w-4">{title}</p>}
            position="absolute"
            className="min-w-0"
          />
          <button onClick={handleSelectorOpen} title={changeMessage}>
            <p
              className={clsx(
                "text-start text-[14px] truncate leading-none",
                isLocationMissing ? "text-error" : "text-text-secondary"
              )}>
              {smallMessage}
            </p>
          </button>
        </div>
      </div>
      <TimeContent id={id} />
    </div>
  );
}

export default LocationNode;
