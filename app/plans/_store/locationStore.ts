import LocationData from "@/types/location";
import { StateCreator } from "zustand";
import { PermissionStore } from "./permissionStore";

export interface LocationState {
  locations: Record<string, LocationData>;
  closedLocationIds: string[];
}

export interface LocationActions {
  setLocations: (locationList: LocationData[]) => void;
  addLocation: (location: LocationData) => void;
  updateLocation: (id: string, updatedFields: Partial<LocationData>) => void;
  removeLocation: (id: string) => void;

  closeLocation: (id: string) => void;
  openLocation: (id: string) => void;
}

export type LocationStore = LocationState & LocationActions;

export const defaultLocationStore: LocationState = {
  locations: {},
  closedLocationIds: [],
};

const isReadOnly = (state: LocationStore & PermissionStore) => state.isReadOnly;

export const createLocationSlice: StateCreator<
  LocationStore & PermissionStore,
  [],
  [],
  LocationStore
> = (set) => ({
  ...defaultLocationStore,
  setLocations: (locationList) => {
    const locationMap: Record<string, LocationData> = locationList.reduce(
      (acc, location) => {
        acc[location.id] = location;
        return acc;
      },
      {} as Record<string, LocationData>
    );
    set({ locations: locationMap });
  },
  addLocation: (location) => {
    set((state) => {
      if (isReadOnly(state)) return state;
      return {
        locations: {
          ...state.locations,
          [location.id]: location,
        },
      };
    });
  },
  updateLocation: (id, updatedFields) => {
    set((state) => {
      if (isReadOnly(state)) return state;
      return {
        locations: {
          ...state.locations,
          [id]: {
            ...state.locations[id],
            ...updatedFields,
          },
        },
      };
    });
  },
  removeLocation: (id) => {
    set((state) => {
      if (isReadOnly(state)) return state;
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
