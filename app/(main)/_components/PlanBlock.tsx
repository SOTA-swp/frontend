import SectionTitle from "@/components/SectionTitle";
import { ReactNode } from "react";

function PlanBlock({
  icon,
  moreButton,
  title,
  children,
}: {
  icon?: ReactNode;
  moreButton?: ReactNode;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <div className="min-h-125">
      <SectionTitle color="gray" icon={icon}>
        {title}
      </SectionTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] mt-8 gap-4">
        {children}
      </div>
      <div className="mt-4 flex justify-end">{moreButton}</div>
    </div>
  );
}

export default PlanBlock;
