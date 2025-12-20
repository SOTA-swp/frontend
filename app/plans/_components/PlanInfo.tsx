import Chip from "@/components/Chip";
import { usePlanStore } from "../_store/hook";
import IconButton from "@/components/IconButton";
import { MdEdit } from "react-icons/md";

function PlanInfo() {
  const planTitle = usePlanStore((state) => state.title);
  const planDescription = usePlanStore((state) => state.description);

  return (
    <div className="my-3 py-2 pl-4 max-w-[1200px] border-l-2 border-accent">
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-bold">{planTitle}</h2>
        <div className="flex gap-2 items-center">
          <Chip variant="outline" rounded>
            <p className="pr-2">・公開中 </p>
          </Chip>
          {/* TODO: 編集モーダルを開く */}
          <IconButton
            title="編集する"
            variant={"iconOnly"}
            color={"gray"}
            icon={<MdEdit />}
          />
        </div>
      </div>
      <p className="mt-1 text-text-secondary text-sm text-muted-foreground">
        {planDescription}
      </p>
    </div>
  );
}

export default PlanInfo;
