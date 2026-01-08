"use client";

import { useForm } from "react-hook-form";
import {
  InvitationFormData,
  InvitationFormSchema,
} from "../../_types/InvitationFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendInvitation } from "../../actions";
import { Plan } from "@/types/plan";
import TextField from "@/components/TextField";
import CommonButton from "@/components/CommonButton";

interface InvitationFormProps {
  planId: Plan["id"];
}

function InvitationForm({ planId }: InvitationFormProps) {
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm<InvitationFormData>({
    resolver: zodResolver(InvitationFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  }); // 招待用

  const onSubmit = async (data: InvitationFormData) => {
    const toastId = toast.loading("招待を送信中...");
    const { ok, message } = await sendInvitation(data, planId);

    if (!ok) {
      toast.error(`${message}`, { id: toastId });
      return;
    }

    toast.success("招待を送信しました！", { id: toastId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-4 items-start">
        <TextField
          helperText={
            errors.email?.message ||
            "招待したいユーザーのメールアドレスを入力してください。"
          }
          error={!!errors.email}
          type="email"
          label="メールアドレス"
          placeholder="example@gmail.com"
          {...register("email")}
          fullWidth
          className="flex-1"
        />
        <CommonButton
          type="submit"
          modal
          size={"lg"}
          className="shrink-0"
          disabled={!isDirty || isSubmitting || Object.keys(errors).length > 0}>
          招待
        </CommonButton>
      </div>
    </form>
  );
}

export default InvitationForm;
