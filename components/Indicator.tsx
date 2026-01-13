import { motion } from "motion/react";

interface IndicatorProps {
  value?: number;
}

function Indicator({ value }: IndicatorProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-error border border-paper rounded-full text-paper text-xs">
      <motion.p
        initial={{ y: 2, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 2, opacity: 0 }}
        transition={{ duration: 0.2, ease: "circOut", delay: 0.05 }}>
        {typeof value === "number" && value > 10 ? "+9" : value}
      </motion.p>
    </motion.div>
  );
}

export default Indicator;
