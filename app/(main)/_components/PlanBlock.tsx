import SectionTitle from "@/components/SectionTitle";
import { ReactNode } from "react";

function PlanBlock({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <SectionTitle color="gray" icon={icon}>
        {title}
      </SectionTitle>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] mt-8 gap-4">
        {children}
      </div>
    </>
  );
}

export default PlanBlock;
