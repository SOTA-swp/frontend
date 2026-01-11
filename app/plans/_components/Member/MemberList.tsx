"use client";
import { Plan } from "@/types/plan";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import useSWR from "swr";
import { PLAN_ROLE } from "../../../../consts/PLAN_ROLE";
import { useAppStore } from "@/store/AppStoreProvider";
import { Member } from "@/types/member";
import MemberItem from "./MemberItem";
import Chip from "@/components/Chip";

const getMembers = async (
  planId: Plan["id"]
): Promise<{ active: Member[]; invited: Member[] }> => {
  const res = await fetchWrapper.get(ApiRoutes.plan.members(planId));

  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }

  const members: { active: Member[]; invited: Member[] } = await res.json();
  return members;
};

interface MemberListProps {
  planId: Plan["id"];
}

function MemberList({ planId }: MemberListProps) {
  const myData = useAppStore((state) => state.user);
  const { data } = useSWR(
    ApiRoutes.plan.members(planId),
    () => getMembers(planId),
    {
      suspense: true,
    }
  );

  if (!data) {
    return <p className="text-text-secondary">データの取得に失敗しました</p>;
  }

  const { active, invited: invitedMembers } = data;

  const owner = active.find((member) => member.role === PLAN_ROLE.OWNER);
  const me = active.find(
    (member) => member.id === myData?.id && member.role !== PLAN_ROLE.OWNER
  );
  const others = active.filter(
    (member) => [owner?.id, me?.id].includes(member.id) === false
  );

  console.log(owner, me, others);

  const activeMembers = [owner, me, ...others].filter(
    (member): member is Member => member !== undefined
  );

  return (
    <div className="flex flex-col gap-4">
      <MemberBlock title="参加中のメンバー" members={activeMembers} />
      <MemberBlock title="招待中のメンバー" members={invitedMembers} />
    </div>
  );
}

interface MemberBlockProps {
  title: string;
  members: Member[];
}

function MemberBlock({ title, members }: MemberBlockProps) {
  const nullContent = <p className="text-text-secondary">メンバーがいません</p>;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Chip color={"gray"} size={"sm"} rounded>
          {title}
        </Chip>
      </div>
      {members.length === 0 ? (
        nullContent
      ) : (
        <ul className="flex flex-col gap-2">
          {members.map((member) => (
            <MemberItem key={member.id} member={member} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MemberList;
