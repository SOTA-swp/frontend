"use client";

import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import TextField from "@/components/TextField";
import { useAppStore } from "@/store/AppStoreProvider";
import { EditUserFormData, EditUserFormSchema } from "../_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editUser } from "../actions";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

interface UserEditModalProps {
  onEdit?: (data: EditUserFormData) => void;
}

function UserEditModal({ onEdit }: UserEditModalProps) {
  const closeModal = useAppStore((state) => state.closeModal);
  const refetch = useAppStore((state) => state.refetch);
  const preUsername = useAppStore((state) => state.user?.username) || "";
  const {
    register,
    formState: { errors, isSubmitting, isDirty },
    handleSubmit,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserFormSchema),
    mode: "onChange",
    defaultValues: {
      username: preUsername,
    },
  });
  const path = usePathname();

  const onSubmit = async (data: EditUserFormData) => {
    const { ok, message } = await editUser(data, path);
    const toastId = toast.loading("保存中...");
    onEdit?.(data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // デモ用の遅延

    if (!ok) {
      toast.error(`名前の変更に失敗しました: ${message}`, { id: toastId });
      return;
    }
    toast.success("名前を変更しました！", { id: toastId });
    await refetch();
    closeModal();
    // router.refresh();
  };

  return (
    <ModalContent
      closeModal={closeModal}
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}>
      <ModalTitle>名前を変更</ModalTitle>
      <div className="px-4 flex flex-col gap-6">
        <TextField
          {...register("username")}
          helperText={errors.username?.message}
          error={!!errors.username}
          label="名前"
          placeholder={preUsername}
          autoComplete="off"
          fullWidth
        />
        <div className="text-sm text-text-secondary">
          <p>* ユーザー名はすべてのユーザーに公開されます。</p>
          <p>
            *
            公序良俗に反する名前や他者を不快にさせる名前は入力しないでください。
          </p>
        </div>
      </div>
      <ModalAction>
        <CommonButton
          type="button"
          modal
          variant={"outline"}
          onClick={closeModal}>
          キャンセル
        </CommonButton>
        <CommonButton
          type="submit"
          modal
          disabled={!isDirty || isSubmitting || Object.keys(errors).length > 0}>
          保存
        </CommonButton>
      </ModalAction>
    </ModalContent>
  );
}

export default UserEditModal;
