import LocationType from "@/types/location";
import { create } from "zustand";

interface LocationStore {
  // ロケーションデータを管理するストア
  locations: Record<string, LocationType>;
  setLocations: (locationList: LocationType[]) => void;
  updateLocation: (id: string, updatedFields: Partial<LocationType>) => void;
  removeLocation: (id: string) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: {},

  setLocations: (locationList) => {
    const locationMap: Record<string, LocationType> = locationList.reduce(
      (acc, location) => {
        acc[location.id] = location;
        return acc;
      },
      {} as Record<string, LocationType>
    );
    set({ locations: locationMap });
  },
  updateLocation: (id, updatedFields) => {
    set((state) => ({
      locations: {
        ...state.locations,
        [id]: {
          ...state.locations[id],
          ...updatedFields,
        },
      },
    }));
  },
  removeLocation: (id) => {
    set((state) => {
      const newLocations = { ...state.locations };
      delete newLocations[id];
      return { locations: newLocations };
    });
  },
}));
