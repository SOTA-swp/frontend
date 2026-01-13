import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { CalculateRouteRequestBody, CalculateRouteResponse, LatLng, TravelMode } from "@/types/route";

/**
 * 複数の地点間のルートを計算するAPIを呼び出す
 * @param locations 緯度経度の配列
 * @param mode 移動手段 (デフォルト: DRIVE)
 * @returns 計算されたルートセグメントの配列
 */
export const calculateRoutes = async (
  locations: LatLng[],
  mode: TravelMode = "DRIVE"
): Promise<CalculateRouteResponse> => {
  const body: CalculateRouteRequestBody = { locations, mode };

  const res = await fetchWrapper.post(ApiRoutes.routes.calculate, body);

  if (!res.ok) {
    const message = (await res.json())?.message || res.statusText;
    throw new Error(`ルート計算に失敗しました: ${message}`);
  }

  const routeSegments: CalculateRouteResponse = await res.json();
  return routeSegments;
};
