"use client";
import PATH from "@/consts/PATH";
import { useAppStore } from "@/store/AppStoreProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// ログイン状態を確認して、ログインされていたらユーザーページにリダイレクトする
function LoginCheck() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace(PATH.USER());
    }
  }, [user, router, pathname]);

  return null;
}

export default LoginCheck;
