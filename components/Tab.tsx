"use client";
import clsx from "clsx";
import { motion } from "motion/react";
import React from "react";

interface TabItemProps {
  value: string;
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
  value,
  tabList,
  onChange,
}: {
  id?: string | number;
  value?: string;
  tabList?: TabItemProps[];
  onChange?: (value: string) => void;
}) {
  const [stateValue, setStateValue] = React.useState(tabList?.[0]?.value || "");
  const activeValue = value || stateValue;

  const onChangeValue = (newValue: string) => {
    onChange?.(newValue);
    setStateValue(newValue);
  };

  return (
    <motion.div
      layout
      className={`flex border border-border rounded-full overflow-hidden select-none`}>
      {tabList?.map((tab) => (
        <TabItem
          key={tab.value}
          value={tab.value}
          itemContent={tab.itemContent}
          onClick={() => onChangeValue(tab.value)}
          className={clsx(
            "transition-colors",
            activeValue === tab.value && "text-paper",
            activeValue !== tab.value &&
              "text-text-secondary hover:text-primary hover:bg-primary/10"
          )}>
          {activeValue === tab.value && (
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
