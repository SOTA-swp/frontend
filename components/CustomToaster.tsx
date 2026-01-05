import LAYER from "@/consts/LAYER";
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  MdInfoOutline,
  MdWarningAmber,
} from "react-icons/md";
import { Toaster } from "sonner";

function CustomToaster() {
  return (
    <Toaster
      expand
      visibleToasts={5}
      style={{ zIndex: LAYER.TOASTER }}
      toastOptions={{
        className: "!border",
        classNames: {
          success: "!border-primary",
          error: "!border-error",
          info: "!border-secondary",
          warning: "!border-accent",
        },
      }}
      icons={{
        success: <MdCheckCircleOutline className="text-primary" />,
        error: <MdErrorOutline className="text-error" />,
        info: <MdInfoOutline className="text-secondary" />,
        warning: <MdWarningAmber className="text-accent" />,
      }}
      position="top-center"
    />
  );
}

export default CustomToaster;
