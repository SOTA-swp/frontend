import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import TextField from "@/components/TextField";

function AddPlanModal() {
  return (
    <ModalContent>
      <ModalTitle>計画を作成</ModalTitle>
      <div className="p-4 flex flex-col gap-4">
        <TextField label="計画名" placeholder="計画名を入力してください" />
        <TextField
          label="説明"
          placeholder="計画の説明を入力してください"
          textarea
          rows={4}
        />
      </div>
      <ModalAction>
        <CommonButton>キャンセル</CommonButton>
        <CommonButton>保存</CommonButton>
      </ModalAction>
    </ModalContent>
  );
}

export default AddPlanModal;
