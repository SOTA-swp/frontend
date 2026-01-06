"use client";
import { User } from "@/types/user";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";
import { UserInfoBlock } from "@/components/UserInfoBlock";
import PROJECT_NAME from "@/consts/PROJECT_NAME";
import { VIEW_TOP_MARGIN } from "../_consts/HEADER_HIGHT";
import { use, useRef } from "react";
import MainViewController from "./MainViewController";
import { useAppStore } from "@/store/AppStoreProvider";
import IconButton from "@/components/IconButton";
import { MdEdit } from "react-icons/md";
import UserEditModal from "./UserEditModal";

export type UserViewProps = {
  userData: Promise<
    | (User & {
        favoritesCount: number;
        favoredCount: number;
        createdCount: number;
      })
    | null
  >;
};

function UserView({ userData }: UserViewProps) {
  const userDataResolved = use(userData);
  const createDate = new Date(userDataResolved?.createdAt || "");
  const ref = useRef<HTMLElement>(null);
  const user = useAppStore((state) => state.user);
  const openModal = useAppStore((state) => state.openModal);

  if (!userDataResolved) {
    return null;
  }

  const isMe = user?.id === userDataResolved.id;

  const handleEditName = () => {
    openModal(<UserEditModal />);
  };

  return (
    <section
      ref={ref}
      id={MAIN_PAGE_IDs.USER}
      className="relative "
      style={{ scrollMarginTop: VIEW_TOP_MARGIN }}>
      <MainViewController
        ref={ref}
        viewId={MAIN_PAGE_IDs.USER}
        rootMargin="-30% 0px -90% 0px"
      />
      <div className="absolute -z-10 w-[200dvw] h-full bg-paper inset-shadow-2 rounded-lg inset-shadow-sm border border-primary" />
      <div className="relative flex flex-col gap-6 w-full p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border-2 border-accent shrink-0">
              {
                // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                <img src={userDataResolved.picture} className="w-20 h-20" />
              }
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold">
                  {userDataResolved.username}
                  {isMe && (
                    <span className="text-[1rem] text-text-secondary">
                      {" "}
                      (あなた)
                    </span>
                  )}
                </h1>
                {isMe && (
                  <IconButton
                    onClick={handleEditName}
                    icon={<MdEdit />}
                    size={"sm"}
                    variant={"iconOnly"}
                    color={"gray"}
                  />
                )}
              </div>
              <p className="text-text-secondary">
                {createDate.toLocaleDateString()}から利用しています
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <UserInfoBlock
            title={"作った計画"}
            sum={userDataResolved.createdCount}
          />
          <UserInfoBlock title={`${PROJECT_NAME}歴`} sum={0} />
          <UserInfoBlock
            title={"いいねされた数"}
            sum={userDataResolved.favoritesCount}
          />
          <UserInfoBlock
            title={"いいねした数"}
            sum={userDataResolved.favoredCount}
          />
        </div>
      </div>
    </section>
  );
}

export default UserView;
