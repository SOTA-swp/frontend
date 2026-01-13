"use client";
import GrowIconButton from "@/components/GrowIconButton";
import PATH from "@/consts/PATH";
import {
  NOTIFICATION_TYPES,
  type NotificationData,
} from "@/types/notification";
import { truncateString } from "@/utils/str";
import Link from "next/link";
import { ReactNode, useRef } from "react";
import { MdClose, MdFavorite, MdGroup, MdHowToReg } from "react-icons/md";
import { respondToInvitation } from "../../actions";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface NotificationProps {
  data: NotificationData;
}

function NotificationItem({ data }: NotificationProps) {
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({ mode: "onSubmit" });
  const acceptedRef = useRef(false);
  const { type, triggerUser, plan, isRead } = data;
  const path = usePathname();

  const userLink = (
    <Link
      href={PATH.USER(triggerUser.id)}
      className="text-primary hover:underline">
      {truncateString(triggerUser.username, 15)}
    </Link>
  );

  const planLink = plan ? (
    <Link
      href={PATH.PLAN_VIEW(plan.id)}
      className="text-primary hover:underline">
      {truncateString(plan.title, 15)}
    </Link>
  ) : null;

  const onSubmit = async () => {
    const accepted = acceptedRef.current;
    const toastId = toast.loading(
      accepted ? "参加を承認中..." : "参加を拒否中..."
    );

    const { invitation } = data;
    if (!invitation) {
      toast.error("不正なリクエストです", { id: toastId });
      throw new Error("No invitation data");
    }

    const { ok, message } = await respondToInvitation(
      invitation.id,
      accepted,
      path
    );
    if (!ok) {
      toast.error(`操作に失敗しました: ${message}`, { id: toastId });
      throw new Error("Failed to respond to invitation");
    }
    toast.success("操作が完了しました！", { id: toastId });
  };

  const item: {
    icon: ReactNode;
    message: ReactNode;
    action: ReactNode;
  } = (() => {
    switch (type) {
      case NOTIFICATION_TYPES.LIKE:
        return {
          icon: (
            <MdFavorite
              className={clsx(isRead ? "text-text-secondary" : "text-accent")}
            />
          ),
          message: (
            <p>
              {userLink} さんが {planLink} にいいねしました！
            </p>
          ),
          action: <></>,
        };
      case NOTIFICATION_TYPES.INVITATION:
        return {
          icon: (
            <MdGroup
              className={clsx(
                isRead ? "text-text-secondary" : "text-secondary"
              )}
            />
          ),
          message: (
            <p>
              {userLink} さんが {planLink} に招待しました！
            </p>
          ),
          action: (() => {
            const disabled = isSubmitting || isSubmitSuccessful;

            return (
              <>
                <GrowIconButton
                  type="submit"
                  onClick={() => (acceptedRef.current = false)}
                  icon={<MdClose />}
                  size={"sm"}
                  color="error"
                  disabled={disabled}>
                  拒否する
                </GrowIconButton>
                <GrowIconButton
                  type="submit"
                  onClick={() => (acceptedRef.current = true)}
                  icon={<MdHowToReg />}
                  size={"sm"}
                  disabled={disabled}>
                  参加する
                </GrowIconButton>
              </>
            );
          })(),
        };
      default:
        throw new Error("Unknown notification type");
    }
  })();

  return (
    <li className="min-h-10">
      <form
        className="flex items-center justify-between"
        onSubmit={handleSubmit(onSubmit)}>
        <div
          className={clsx("flex items-center gap-4", isRead && "opacity-70")}>
          <div className="text-2xl">{item.icon}</div>
          <div>{item.message}</div>
        </div>
        <div className="shrink-0 flex items-center gap-2">{item.action}</div>
      </form>
    </li>
  );
}

export default NotificationItem;
