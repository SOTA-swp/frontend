// TODO: planIDとかいらんのか？
export default interface LocationData {
  id: string;
  title: string;
  address: string;
  lat: number; // 緯度
  lng: number; // 経度
  description: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export const createMockLocation = (
  num: number = 0,
  props?: Partial<LocationData>
): LocationData => ({
  id: `location-${num}`,
  title: `モック施設名${num}`,
  address: `モック住所${num}`,
  lat: 35.681236 + num * 0.01,
  lng: 139.767125 + num * 0.01,
  description: `モック説明文モック説明文モック説明文モック説明文モック説明文${num}`,
  thumbnail: `/mock/img/mock_Location.jpg`,
  created_at: "2025-11-09T12:00:00.000Z",
  updated_at: "2025-11-09T12:00:00.000Z",
  ...props,
});
