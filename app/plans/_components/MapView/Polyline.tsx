"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

interface PolylineProps {
  path: (google.maps.LatLngLiteral | string)[];
}

function Polyline({ path }: PolylineProps) {
  const map = useMap();
  const mapsLib = useMapsLibrary("maps");
  const geometryLib = useMapsLibrary("geometry");
  const polyline = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !mapsLib || !geometryLib) return;

    const decodedPath = path.flatMap((item) => {
      if (typeof item === "string") {
        return geometryLib.encoding.decodePath(item).map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
      }
      return item;
    });

    const newPolyline = new mapsLib.Polyline({
      path: decodedPath,
      geodesic: true,
      strokeColor: "#FF0000", // 赤色
      strokeOpacity: 1.0,
      strokeWeight: 3,
      icons: [
        {
          // 矢印をつける
          icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
          offset: "100%",
          repeat: "100px", // 一定間隔で矢印を表示
        },
      ],
    });

    newPolyline.setMap(map);
    polyline.current = newPolyline;

    return () => {
      newPolyline.setMap(null);
    };
  }, [map, mapsLib, geometryLib, path]);

  return null;
}

export default Polyline;
