export default interface LocationDataType {
  id: string;
  title: string;
  address: string;
  description: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export const createMockLocation = (
  num: number = 0,
  props?: Partial<LocationDataType>
): LocationDataType => ({
  id: `location-${num}`,
  title: `モック施設名${num}`,
  address: `モック住所${num}`,
  description: `モック説明文モック説明文モック説明文モック説明文モック説明文${num}`,
  thumbnail: `/mock/img/mock_Location.jpg`,
  created_at: "2025-11-09T12:00:00.000Z",
  updated_at: "2025-11-09T12:00:00.000Z",
  ...props,
});
