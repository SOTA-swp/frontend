"use client";
import UserType from "@/types/user";
import { MAIN_PAGE_IDs } from "../_consts/MAIN_PAGE_IDs";

export interface UserViewProps {
  userData: UserType & {
    favoritesCount: number;
    createdCount: number;
  };
}

function UserView({}: UserViewProps) {
  return (
    <section id={MAIN_PAGE_IDs.USER} className={"h-dvh"}>
      UserView
    </section>
  );
}

export default UserView;
