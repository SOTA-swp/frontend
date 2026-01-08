import { useAppStore } from "@/store/AppStoreProvider";
import { Controller, useForm } from "react-hook-form";
import {
  EditPlanFormData,
  EditPlanFormSchema,
} from "../_types/EditPlanFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { editPlan } from "@/app/(main)/actions";
import ModalContent from "@/components/modal/ModalContent";
import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalTitle from "@/components/modal/ModalTitle";
import TextField from "@/components/TextField";
import Chip from "@/components/Chip";
import { Switch } from "@/components/ui/switch";

interface EditPlanInfoModalProps {
  planId: string;
  planData?: EditPlanFormData;
  onEdit?: (data: EditPlanFormData) => void;
  path?: string;
}

function EditPlanInfoModal({
  planId,
  planData,
  onEdit,
  path,
}: EditPlanInfoModalProps) {
  const closeModal = useAppStore((state) => state.closeModal);
  const {
    register,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    control,
  } = useForm<EditPlanFormData>({
    resolver: zodResolver(EditPlanFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      isPublic: false,
      ...(planData || {}),
    },
  });

  const onSubmit = async (data: EditPlanFormData) => {
    const toastId = toast.loading("計画情報を更新中...");
    onEdit?.(data);

    const { ok, message } = await editPlan(planId, data, path);

    if (!ok) {
      toast.error(`計画情報の更新に失敗しました: ${message}`, {
        id: toastId,
      });
      return;
    }
    toast.success("計画情報を更新しました！", { id: toastId });
    closeModal();
  };

  return (
    <ModalContent
      closeModal={closeModal}
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}>
      <ModalTitle>基本情報を編集</ModalTitle>
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
        <div className="flex flex-col mb-5">
          <label className="mb-2 font-medium" htmlFor="isPublic">
            公開設定
          </label>
          <Controller
            control={control}
            name="isPublic"
            render={({ field: { value, onChange } }) => (
              <div className="flex justify-between items-start">
                <Chip
                  rounded
                  variant={"outline"}
                  color={!!value ? "primary" : "gray"}>
                  <p className="mr-1.5">・{!!value ? "公開中" : "非公開"}</p>
                </Chip>
                <Switch checked={!!value} onCheckedChange={onChange} />
              </div>
            )}
          />
          <div className="flex flex-col gap-1 text-sm text-error">
            <p>* 公開した計画は全ユーザーが閲覧することができます。</p>
            <p>
              *
              住所などの個人情報や、個人が特定できる情報は計画に含めないでください。
            </p>
          </div>
        </div>
      </div>
      <ModalAction>
        <CommonButton
          type="button"
          modal
          variant="outline"
          onClick={closeModal}>
          キャンセル
        </CommonButton>
        <CommonButton
          type="submit"
          modal
          disabled={
            !isDirty ||
            isSubmitting ||
            isSubmitSuccessful ||
            Object.keys(errors).length > 0
          }>
          更新
        </CommonButton>
      </ModalAction>
    </ModalContent>
  );
}

export default EditPlanInfoModal;
