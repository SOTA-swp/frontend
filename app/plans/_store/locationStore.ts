import LocationType from "@/types/location";
import { StateCreator } from "zustand";

export interface LocationState {
  locations: Record<string, LocationType>;
  closedLocationIds: string[];
}

export interface LocationActions {
  setLocations: (locationList: LocationType[]) => void;
  updateLocation: (id: string, updatedFields: Partial<LocationType>) => void;
  removeLocation: (id: string) => void;

  closeLocation: (id: string) => void;
  openLocation: (id: string) => void;
}

export type LocationStore = LocationState & LocationActions;

export const defaultLocationStore: LocationState = {
  locations: {},
  closedLocationIds: [],
};

export const createLocationSlice: StateCreator<LocationStore> = (set) => ({
  ...defaultLocationStore,
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
  closeLocation: (id) => {
    set((state) => ({
      closedLocationIds: [...state.closedLocationIds, id],
    }));
  },
  openLocation: (id) => {
    set((state) => ({
      closedLocationIds: state.closedLocationIds.filter(
        (locationId) => locationId !== id
      ),
    }));
  },
});
