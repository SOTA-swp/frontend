"use client";
import LocationData from "@/types/location";
import { Marker, MarkerProps } from "@vis.gl/react-google-maps";

interface LocationMarkerProps extends MarkerProps {
  order: number;
  location: LocationData;
}

function LocationMarker({ order, location, ...props }: LocationMarkerProps) {
  return (
    <Marker
      {...props}
      label={{
        text: String(order + 1),
        color: "white",
        fontWeight: "bold",
      }}
      position={{ ...location }}
      title={location.title}
    />
  );
}

export default LocationMarker;
