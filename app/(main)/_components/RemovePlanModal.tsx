"use client";

import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import { useAppStore } from "@/store/AppStoreProvider";
import { Plan } from "@/types/plan";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { deletePlan } from "../actions";
import { usePathname } from "next/navigation";

interface RemovePlanModalProps {
  planId: Plan["id"];
  planTitle: Plan["title"];
}

function RemovePlanModal({ planId, planTitle }: RemovePlanModalProps) {
  const closeModal = useAppStore((state) => state.closeModal);
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();
  const path = usePathname();

  const onSubmit = async () => {
    const toastId = toast.loading("計画を削除中...");

    const { ok, message } = await deletePlan(planId, path);

    if (!ok) {
      toast.error(`計画の削除に失敗しました: ${message}`, { id: toastId });
      return;
    }

    toast.success("計画を削除しました！", { id: toastId });
    closeModal();
  };

  return (
    <ModalContent
      as={"form"}
      closeModal={closeModal}
      onSubmit={handleSubmit(onSubmit)}>
      <ModalTitle modalType="error">計画を削除</ModalTitle>
      <div className="px-6">
        <p>「{planTitle}」を削除します。</p>
        <p>
          この操作は
          <strong className="text-error">取り消せません</strong>
          。本当に削除しますか？
        </p>
      </div>
      <ModalAction>
        <CommonButton
          onClick={closeModal}
          type="button"
          modal
          variant={"outline"}
          color="error">
          キャンセル
        </CommonButton>
        <CommonButton
          type="submit"
          modal
          color="error"
          disabled={isSubmitting || isSubmitSuccessful}>
          削除する
        </CommonButton>
      </ModalAction>
    </ModalContent>
  );
}

export default RemovePlanModal;
