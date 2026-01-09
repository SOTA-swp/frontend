import z from "zod";

export const LocationDataSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  address: z.string().min(1).max(200),
  lat: z.number(), // 緯度
  lng: z.number(), // 経度
  description: z.string().max(500),
  thumbnail: z.url(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  x: z.number().default(0), 
  y: z.number().default(0),
});

// TODO: planIDとかいらんのか？
export type LocationData = z.infer<typeof LocationDataSchema>;

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
  x: 100 + (num * 220), // カードの幅分くらいずらすイメージ
  y: 100 + (num * 50),
  ...props,
});
