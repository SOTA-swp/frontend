"use client";
import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import TextField from "@/components/TextField";
import PATH from "@/consts/PATH";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createPlan } from "../actions";
import { AddPlanFormData, AddPlanFormSchema } from "../_types";
import { toast } from "sonner";
import { useAppStore } from "@/store/AppStoreProvider";

function AddPlanModal() {
  const closeModal = useAppStore((state) => state.closeModal);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddPlanFormData>({
    resolver: zodResolver(AddPlanFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router = useRouter();

  const onsubmit = async (data: AddPlanFormData) => {
    const toastId = toast.loading("計画を作成中...");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // デモ用の遅延
    const res = await createPlan(data);

    if (!res.ok) {
      toast.error(`計画の作成に失敗しました: ${res.message}`, { id: toastId });
      return;
    }
    toast.success("計画を作成しました！", { id: toastId });
    router.push(PATH.PLAN_EDIT(res.newPlan?.id || ""));
    closeModal();
  };

  return (
    <ModalContent
      closeModal={closeModal}
      as={"form"}
      onSubmit={handleSubmit(onsubmit)}>
      <ModalTitle>計画を作成</ModalTitle>
      <div className="px-4 flex flex-col gap-6">
        <TextField
          {...register("title")}
          helperText={errors.title?.message}
          error={!!errors.title}
          label="計画名"
          placeholder="3泊4日の京都旅行"
          fullWidth
        />
        <TextField
          {...register("description")}
          helperText={errors.description?.message}
          error={!!errors.description}
          label="説明"
          placeholder="京都での観光スポットやグルメを楽しむ最高の計画！"
          textarea
          rows={4}
          fullWidth
          style={{ resize: "none" }}
        />
      </div>
      <ModalAction>
        <CommonButton
          type="button"
          modal
          variant="outline"
          onClick={closeModal}>
          キャンセル
        </CommonButton>
        <CommonButton type="submit" modal>
          作成
        </CommonButton>
      </ModalAction>
    </ModalContent>
  );
}

export default AddPlanModal;
