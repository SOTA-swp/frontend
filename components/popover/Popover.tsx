import LAYER from "@/consts/LAYER";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useFloating,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";

function Popover({
  open,
  anchorEl,
  placement = "top",
  onClose,
  children,
}: {
  open?: boolean;
  anchorEl?: HTMLElement | null;
  placement?: Placement;
  onClose?: () => void;
  children?: React.ReactNode;
}) {
  const { refs, floatingStyles } = useFloating({
    open,
    placement,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchorEl || null,
    },
    middleware: [offset(8), flip(), shift()],
  });

  const { setFloating } = refs;

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0"
              style={{ zIndex: LAYER.POPOVER }}
              onClick={onClose}
            />
            <div
              ref={setFloating}
              style={{ zIndex: LAYER.POPOVER + 1, ...floatingStyles }}>
              <motion.div
                className="bg-white p-4 rounded-md shadow-md"
                initial={{ opacity: 0, scale: 0.9, y: 5 }} // 少し下からふわっと出る感じ
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 5,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  opacity: { ease: "linear", duration: 0.2 },
                }}>
                {children}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}

export default Popover;
