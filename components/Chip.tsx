import CommonText from "./CommonText";

function Chip({ children }: { children?: React.ReactNode }) {
  return (
    <div className="">
      <CommonText className="text-xs text-primary">{children}</CommonText>
    </div>
  );
}

export default Chip;
