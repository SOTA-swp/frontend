import clsx from "clsx";

export default function ModalTitle({
  modalType = "default",
  children,
}: {
  modalType?: "default" | "error";
  children?: React.ReactNode;
}) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <h2
        className={clsx(
          "text-2xl font-bold",
          modalType === "default" && "text-primary",
          modalType === "error" && "text-error"
        )}>
        {children}
      </h2>
    </div>
  );
}
