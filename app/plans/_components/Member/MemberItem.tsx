import Chip from "@/components/Chip";
import UserLink from "@/components/UserLink";
import { PLAN_ROLE } from "@/consts/PLAN_ROLE";
import { useAppStore } from "@/store/AppStoreProvider";
import { Member } from "@/types/member";

interface MemberItemProps {
  member: Member;
}

function MemberItem({ member }: MemberItemProps) {
  const isMe = useAppStore((state) => state.user?.id === member.id);

  return (
    <li className="flex justify-between">
      <UserLink
        userData={member}
        enableLink={false}
        enableEmail={false}
        rightIcon={false}
      />
      <div className="flex gap-2 items-start">
        {member.role === PLAN_ROLE.OWNER && (
          <Chip variant={"outline"}>オーナー</Chip>
        )}
        {isMe && <Chip variant={"outline"}>自分</Chip>}
      </div>
    </li>
  );
}

export default MemberItem;
