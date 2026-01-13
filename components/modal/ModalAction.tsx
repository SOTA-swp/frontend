export default function ModalAction({
  children,
}: {
  children?: React.ReactNode;
}) {
  if (!children) {
    return null;
  }

  return (
    <div className="mt-auto flex justify-end">
      <div className="flex justify-end gap-4 p-4 border-t border-l rounded-tl-lg border-border">
        {children}
      </div>
    </div>
  );
}
