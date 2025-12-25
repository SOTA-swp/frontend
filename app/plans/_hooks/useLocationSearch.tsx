import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

interface LocationSearchResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

export const useLocationSearch = (
  onPlaceSelect: (location: LocationSearchResult) => void
) => {
  const placesLib = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // Autocompleteウィジェットの初期化
  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const widget = new placesLib.Autocomplete(inputRef.current, {
      fields: ["place_id", "geometry", "name", "formatted_address"],
      types: ["establishment", "geocode"],
    });

    setAutocomplete(widget);
  }, [placesLib]);

  // 場所が選択されたときの処理
  useEffect(() => {
    if (!autocomplete) return;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location || !place.name) {
        return;
      }

      const result: LocationSearchResult = {
        name: place.name,
        address: place.formatted_address || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: place.place_id || "",
      };

      onPlaceSelect(result);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return () => {
        google.maps.event.removeListener(listener);
      };
    });
  }, [autocomplete, onPlaceSelect]);

  return {
    inputRef,
    autocomplete,
    placesLib,
  };
};
