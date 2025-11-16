import PlanType from "@/types/plan";
import UserType from "@/types/user";

type PlanCardProps = {
  variant?: "default" | "mini";
  open?: boolean;
  planData: PlanType & { likes: number };
  userData: UserType;
  onClose?: () => void;
  onOpen?: () => void;
};

function PlanCard({
  open = false,
  variant = "default",
  planData,
  userData,
  onClose,
  onOpen,
}: PlanCardProps) {
  return <>{variant === "default" ? <div>PlanCard</div> : <></>}</>;
}

export default PlanCard;
