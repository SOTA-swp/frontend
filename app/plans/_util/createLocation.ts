import LocationDataType from "@/types/location";

export const createLocation = (
  props?: Partial<LocationDataType>
): LocationDataType => {
  const id = window.crypto.randomUUID();
  return {
    id,
    title: "新しい場所",
    address: "",
    description: "",
    thumbnail: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...props,
  };
};
