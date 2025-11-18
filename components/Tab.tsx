"use client";
import clsx from "clsx";
import { motion } from "motion/react";
import React from "react";

interface TabItemProps {
  label: string;
  itemContent: React.ReactNode;
}

const TabItem = ({
  itemContent,
  onClick,
  children,
  className,
}: TabItemProps & {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={clsx("relative px-1 py-1 z-10 min-w-[135px]")}>
      {children}
      <div className={clsx("relative z-10 px-3 rounded-full", className)}>
        {itemContent}
      </div>
    </button>
  );
};

function Tab({
  id,
  label,
  tabList,
  onChange,
}: {
  id?: string | number;
  label?: string;
  tabList?: TabItemProps[];
  onChange?: (label: string) => void;
}) {
  const [stateLabel, setStateLabel] = React.useState(tabList?.[0]?.label || "");
  const activeLabel = label || stateLabel;

  const onChangeLabel = (newLabel: string) => {
    onChange?.(newLabel);
    setStateLabel(newLabel);
  };

  return (
    <motion.div
      layout
      className={`flex border border-border rounded-full overflow-hidden select-none`}>
      {tabList?.map((tab) => (
        <TabItem
          key={tab.label}
          label={tab.label}
          itemContent={tab.itemContent}
          onClick={() => onChangeLabel(tab.label)}
          className={clsx(
            "transition-colors",
            activeLabel === tab.label && "text-paper",
            activeLabel !== tab.label &&
              "text-text-secondary hover:text-primary hover:bg-primary/10"
          )}>
          {activeLabel === tab.label && (
            <motion.div
              className="absolute inset-0 bg-primary rounded-full"
              layoutId={`tabSelector-${id}`}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          )}
        </TabItem>
      ))}
    </motion.div>
  );
}

export default Tab;
