import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import TextField from "@/components/TextField";
import { PlanSchema } from "@/types/plan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const addPlanFormSchema = PlanSchema.pick({
  title: true,
  description: true,
});

type AddPlanFormData = z.infer<typeof addPlanFormSchema>;

interface AddPlanModalProps {
  closeModal: () => void;
}

function AddPlanModal({ closeModal }: AddPlanModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddPlanFormData>({
    resolver: zodResolver(addPlanFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onsubmit = (data: AddPlanFormData) => {
    console.log("AddPlanFormData:", data);
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
        <CommonButton modal variant="outline" onClick={closeModal}>
          キャンセル
        </CommonButton>
        <CommonButton modal>作成</CommonButton>
      </ModalAction>
    </ModalContent>
  );
}

export default AddPlanModal;
