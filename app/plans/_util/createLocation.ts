import LocationData from "@/types/location";

export const createLocation = (props?: Partial<LocationData>): LocationData => {
  const id = window.crypto.randomUUID();
  return {
    id,
    title: "",
    lat: -1,
    lng: -1,
    address: "",
    description: "",
    thumbnail: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...props,
  };
};
