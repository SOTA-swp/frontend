"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

interface PolylineProps {
  path: google.maps.LatLngLiteral[];
}

function Polyline({ path }: PolylineProps) {
  const map = useMap();
  const mapsLib = useMapsLibrary("maps");
  const polyline = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !mapsLib) return;
    const newPolyline = new mapsLib.Polyline({
      path,
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
  }, [map, mapsLib, path]);

  return null;
}

export default Polyline;
