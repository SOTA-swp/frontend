"use client";

import { useState } from "react";
import CommonButton from "@/components/CommonButton";
import { MdDirectionsCar } from "react-icons/md";
import { usePlanStore } from "../../_store/hook";
import { calculateRoutes } from "@/lib/api/routes";
import { LatLng } from "@/types/route";
import { NODE_TYPES } from "@/types/node";
import { PARENT_ID_ROOT } from "../../_util/createNode";
import { toast } from "sonner";

function RouteCalcButton() {
  const [isCalculating, setIsCalculating] = useState(false);
  const nodes = usePlanStore((state) => state.nodes);
  const locations = usePlanStore((state) => state.locations);
  const structure = usePlanStore((state) => state.structure);
  const applyAutoCalculatedRoutes = usePlanStore(
    (state) => state.applyAutoCalculatedRoutes
  );
  const isReadOnly = usePlanStore((state) => state.isReadOnly);

  // useFlatNodesは単なるIDリストなので、階層構造を意識してロケーションを抽出するロジックが必要。
  // ストア側の applyAutoCalculatedRoutes と同じ走査ロジックを使う必要がある。
  const getValidLocations = (): { latLng: LatLng }[] => {
    const validLocations: { latLng: LatLng }[] = [];
    const traverse = (currentParentId: string) => {
      const children = structure[currentParentId] || [];
      children.forEach((nodeId) => {
        const node = nodes[nodeId];
        if (!node) return;

        if (node.nodeType === NODE_TYPES.LOCATION) {
          const location = locations[node.locationId];
          if (location && location.lat !== -1 && location.lng !== -1) {
            validLocations.push({
              latLng: { lat: location.lat, lng: location.lng }
            });
          }
        } else if (node.nodeType === NODE_TYPES.PROCESS) {
          traverse(nodeId);
        }
      });
    };
    traverse(PARENT_ID_ROOT);
    return validLocations;
  };

  const handleCalculate = async () => {
    if (isCalculating || isReadOnly) return;

    const locationList = getValidLocations();

    if (locationList.length < 2) {
      toast.error("ルート計算には有効なロケーションが2つ以上必要です");
      return;
    }

    setIsCalculating(true);
    const toastId = toast.loading("ルートを計算中...");

    try {
      const results = await calculateRoutes(
        locationList.map((l) => l.latLng),
        "DRIVE"
      );

      applyAutoCalculatedRoutes(results);
      toast.success("移動時間を更新しました", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("ルート計算に失敗しました", { id: toastId });
    } finally {
      setIsCalculating(false);
    }
  };

  if (isReadOnly) return null;

  return (
    <CommonButton
      variant="outline"
      size="sm"
      color="primary"
      onClick={handleCalculate}
      disabled={isCalculating}
      icon={<MdDirectionsCar />}
    >
      移動時間、経路を自動計算
    </CommonButton>
  );
}

export default RouteCalcButton;
