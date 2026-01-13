export interface LatLng {
  lat: number;
  lng: number;
}

export type TravelMode = 'DRIVE' | 'WALK' | 'BICYCLE' | 'TWO_WHEELER' | 'TRANSIT';

export interface RouteSegment {
  fromIndex: number;      // 出発地点の配列インデックス
  toIndex: number;        // 到着地点の配列インデックス
  durationSeconds: number; // 所要時間(秒)
  encodedPolyline?: string; // 地図上に線を描くためのエンコードされた文字列
}

// APIリクエストのBodyの型
export interface CalculateRouteRequestBody {
  locations: LatLng[];
  mode?: TravelMode;
}

// APIレスポンスの型
export type CalculateRouteResponse = RouteSegment[];
