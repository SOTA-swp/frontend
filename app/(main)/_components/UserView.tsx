"use client";
import UserType from "@/types/user";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";
import { UserInfoBlock } from "@/components/UserInfoBlock";
import PROJECT_NAME from "@/consts/PROJECT_NAME";
import { VIEW_TOP_MARGIN } from "../_consts/HEADER_HIGHT";
import GrowIconButton from "@/components/GrowIconButton";
import { MdAdd, MdLogout, MdNotifications, MdSearch } from "react-icons/md";

export interface UserViewProps {
  userData: UserType & {
    favoritesCount: number;
    favoredCount: number;
    createdCount: number;
  };
}

function UserView({ userData }: UserViewProps) {
  const createDate = new Date(userData.createdAt);

  return (
    <section
      id={MAIN_PAGE_IDs.USER}
      className="relative flex flex-col gap-6 w-full p-8 "
      style={{ scrollMarginTop: VIEW_TOP_MARGIN }}>
      <div className="absolute -z-10 inset-0 bg-paper inset-shadow-2 rounded-lg inset-shadow-sm border border-primary" />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full border-2 border-accent shrink-0">
            {
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img src={userData.picture} className="w-20 h-20" />
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-text-secondary">
              {createDate.toLocaleDateString()}から利用しています
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <GrowIconButton icon={<MdAdd />} title="新規作成">
            新規作成
          </GrowIconButton>
          <GrowIconButton icon={<MdSearch />} title="検索">
            検索
          </GrowIconButton>
          <GrowIconButton icon={<MdNotifications />} title="通知">
            通知
          </GrowIconButton>
          <GrowIconButton icon={<MdLogout />} title="ログアウト">
            ログアウト
          </GrowIconButton>
        </div>
      </div>
      <div className="flex gap-2">
        <UserInfoBlock title={"作った計画"} sum={userData.createdCount} />
        <UserInfoBlock title={`${PROJECT_NAME}歴`} sum={0} />
        <UserInfoBlock title={"いいねされた数"} sum={userData.favoritesCount} />
        <UserInfoBlock title={"いいねした数"} sum={userData.favoredCount} />
      </div>
    </section>
  );
}

export default UserView;
