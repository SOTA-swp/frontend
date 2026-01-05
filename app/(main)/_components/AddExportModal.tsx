"use client";
import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import { useAppStore } from "@/store/AppStoreProvider";

function AddExportModal() {
    const closeModal = useAppStore((state) => state.closeModal);

    return (
        <ModalContent
            closeModal={closeModal}>
            <ModalTitle>エクスポート</ModalTitle>
            <div className="px-6 py-0 text-lg text-text-secondary">
                <p>この計画をPDFにエクスポートします。</p>
            </div>
            <ModalAction>
                <CommonButton type="button" modal variant="outline" onClick={closeModal}>
                    キャンセル
                </CommonButton>
                <CommonButton type="submit" modal>
                    エクスポート
                </CommonButton>
            </ModalAction>
        </ModalContent>
    );
}

export default AddExportModal;