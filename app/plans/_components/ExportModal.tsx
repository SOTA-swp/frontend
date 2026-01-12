"use client";

import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import { useAppStore } from "@/store/AppStoreProvider";
import dynamic from "next/dynamic";
import React from "react";
import { Plan } from "@/types/plan";
import { NodeData } from "@/types/node";

const PDF = dynamic(() => import("./PDF"), { ssr: false });

interface ExportModalProps {
  plan: Plan;
  nodes: Record<NodeData["id"], NodeData>;
  structure: Record<NodeData["id"], NodeData["id"][]>;
  locations: Record<NodeData["id"], NodeData>;
}

export default function ExportModal({
  plan,
  nodes,
  structure,
  locations,
}: ExportModalProps) {
  const closeModal = useAppStore((state) => state.closeModal);

  return (
    <ModalContent closeModal={closeModal}>
      <ModalTitle>エクスポート</ModalTitle>

      <div className="px-6 py-0 text-lg text-text-secondary">
        <p>この計画をPDFにエクスポートします。</p>
      </div>

      {/* プレビュー */}
      <div className="flex justify-center py-2">
        <PDF
          planInfo={plan}
          nodes={nodes}
          structure={structure}
          locations={locations}
          previewClassName="border border-border rounded-md w-fit"
        >
          <></>
        </PDF>
      </div>

      <ModalAction>
        <CommonButton
          type="button"
          modal
          variant="outline"
          onClick={closeModal}
        >
          キャンセル
        </CommonButton>

        <PDF
          planInfo={plan}
          nodes={nodes}
          structure={structure}
          locations={locations}
          previewClassName="hidden"
        >
          <CommonButton type="button" modal>
            エクスポート
          </CommonButton>
        </PDF>
      </ModalAction>
    </ModalContent>
  );
}
