import IconButton, { IconButtonProps } from "@/components/IconButton";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { MdAdd } from "react-icons/md";

export interface AddButtonProps extends IconButtonProps {
  childButtons?: ReactNode[];
}

const ANGLE_RANGE = 100;

function AddButton({ childButtons = [], ...props }: AddButtonProps) {
  const calcAngle = (index: number) => {
    const total = childButtons.length;
    if (total === 1) return ANGLE_RANGE / 2;
    return (ANGLE_RANGE / (total - 1)) * index + 90;
  };

  return (
    <div className="absolute p-4 bottom-0 right-0">
      <motion.div
        className="relative flex items-center justify-center"
        initial={"initial"}
        animate={"initial"}
        whileHover={"hover"}>
        <div className="absolute w-30 h-30" />
        {childButtons.map((child, i) => {
          const angle = calcAngle(i);
          const initAngle = angle - 50;
          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center"
              variants={{
                initial: {
                  opacity: 0,
                  transform: `rotate(-${initAngle}deg) translate(0px) rotate(${initAngle}deg)`,
                },
                hover: {
                  opacity: 1,
                  transform: `rotate(-${angle}deg) translate(60px) rotate(${angle}deg)`,
                },
              }}
              transition={{
                opacity: { type: "tween", duration: 0.3 },
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}>
              {child}
            </motion.div>
          );
        })}
        <IconButton {...props} size={"xl"} icon={<MdAdd />} />
      </motion.div>
    </div>
  );
}

export default AddButton;
