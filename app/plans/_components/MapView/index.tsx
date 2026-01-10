"use client";
import { ControlPosition, Map } from "@vis.gl/react-google-maps";
import ViewWrapper from "../ViewWrapper";
import { usePlanStore } from "../../_store/hook";
import { useFlatNodes } from "../../_hooks/useFlatNodes";
import { NODE_TYPES } from "@/types/node";
import LocationMarker from "./LocationMarker";
import Polyline from "./Polyline";
import LocationSearchBox from "./LocationSearchBox";

function MapView() {
  const structure = usePlanStore((state) => state.structure);
  const nodes = usePlanStore((state) => state.nodes);
  const locations = usePlanStore((state) => state.locations);
  const flatNodes = useFlatNodes(structure);
  
  // マーカー表示用（LOCATIONノードのみ抽出）
  const markerNodes = flatNodes.filter((id) => {
    const node = nodes[id];
    if (!node || node.nodeType !== NODE_TYPES.LOCATION) return false;
    const location = locations[node.locationId];
    return location && location.lat !== -1;
  });

  const position = { lat: 35.681236, lng: 139.767125 }; // 東京駅の座標
  
  // パス生成（LOCATIONの座標 と MOVEのencodedPolyline を混在させる）
  const path = flatNodes
    .map((nodeId) => {
      const node = nodes[nodeId];
      if (!node) return null;

      if (node.nodeType === NODE_TYPES.LOCATION) {
        const location = locations[node.locationId];
        if (location && location.lat !== -1) {
          return { lat: location.lat, lng: location.lng };
        }
      } else if (node.nodeType === NODE_TYPES.MOVE) {
        if (node.encodedPolyline) {
          return node.encodedPolyline;
        }
      }
      return null;
    })
    .filter((item): item is google.maps.LatLngLiteral | string => item !== null);

  return (
    <ViewWrapper paper outerElement={<LocationSearchBox />}>
      <Map
        defaultCenter={position}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
        mapTypeControlOptions={{ position: ControlPosition.BOTTOM_LEFT }}
        mapId={null}>
        {markerNodes.map((nodeId, i) => {
          const node = nodes[nodeId];
          const location = locations[node.locationId];
          return <LocationMarker key={nodeId} order={i} location={location} />;
        })}
        <Polyline path={path} />
      </Map>
    </ViewWrapper>
  );
}

export default MapView;
