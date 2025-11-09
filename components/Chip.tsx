import CommonText from "./CommonText";

function Chip({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-primary">
      <CommonText className="text-xs text-paper">{children}</CommonText>
    </div>
  );
}

export default Chip;
