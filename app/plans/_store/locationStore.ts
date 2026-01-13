import { LocationData } from "@/types/location";
import { StateCreator } from "zustand";
import { PermissionStore } from "./permissionStore";
import { YjsStore } from "./yjsStore";
import { PLAN_LOCATIONS_KEY } from "../_consts/yjsKeys";

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

export const createLocationSlice: StateCreator<
  LocationStore & PermissionStore & YjsStore,
  [],
  [],
  LocationStore
> = (set, get) => ({
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
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yLocations = ydoc.getMap<LocationData>(PLAN_LOCATIONS_KEY);
    ydoc.transact(() => {
      yLocations.set(location.id, location);
    });
  },
  updateLocation: (id, updatedFields) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yLocations = ydoc.getMap<LocationData>(PLAN_LOCATIONS_KEY);
    ydoc.transact(() => {
      const current = yLocations.get(id);
      if (current) {
        yLocations.set(id, { ...current, ...updatedFields });
      }
    });
  },

  removeLocation: (id) => {
    const { ydoc, isReadOnly } = get();
    if (!ydoc || isReadOnly) return;

    const yLocations = ydoc.getMap<LocationData>(PLAN_LOCATIONS_KEY);
    ydoc.transact(() => {
      yLocations.delete(id);
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
