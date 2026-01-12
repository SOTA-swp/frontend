"use client";

import { useEffect } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { usePlanStore } from "../_store/hook";
import { NodeData } from "@/types/node";
import { LocationData } from "@/types/location";
import {
  PLAN_LOCATIONS_KEY,
  PLAN_NODES_KEY,
  PLAN_STRUCTURE_KEY,
} from "../_consts/yjsKeys";

interface PlanCollaboratorProps {
  planId: string;
}

export const PlanCollaborator = ({ planId }: PlanCollaboratorProps) => {
  const setYdoc = usePlanStore((state) => state.setYdoc);
  const setProvider = usePlanStore((state) => state.setProvider);
  const setConnectionStatus = usePlanStore(
    (state) => state.setConnectionStatus
  );
  const setNodes = usePlanStore((state) => state.setNodes);
  const setStructure = usePlanStore((state) => state.setStructure);
  const setLocations = usePlanStore((state) => state.setLocations);

  useEffect(() => {
    if (!planId) return;

    const ydoc = new Y.Doc();
    // TODO: 環境変数から取得するようにする
    const provider = new WebsocketProvider(
      "wss://localhost/ws-proxy/ws/plan",
      planId,
      ydoc
    );

    setYdoc(ydoc);
    setProvider(provider);

    provider.on("status", (event: { status: string }) => {
      setConnectionStatus(event.status);
    });

    // ノードをObserve
    const yNodes = ydoc.getMap<NodeData>(PLAN_NODES_KEY);
    const updateNodes = () => {
      setNodes(Object.values(yNodes.toJSON()));
    };
    yNodes.observe(updateNodes);
    updateNodes(); // 初回セット

    // 構造をObserve
    const yStructure = ydoc.getMap<Y.Array<string>>(PLAN_STRUCTURE_KEY);
    const updateStructure = () => {
      setStructure(yStructure.toJSON() as Record<string, string[]>);
    };
    yStructure.observeDeep(updateStructure);
    updateStructure();

    // ロケーションをObserve
    const yLocations = ydoc.getMap<LocationData>(PLAN_LOCATIONS_KEY);
    const updateLocations = () => {
      setLocations(Object.values(yLocations.toJSON()));
    };
    yLocations.observe(updateLocations);
    updateLocations();

    return () => {
      provider.destroy();
      ydoc.destroy();
      setYdoc(null);
      setProvider(null);
      setConnectionStatus("disconnected");
    };
  }, [
    planId,
    setYdoc,
    setProvider,
    setConnectionStatus,
    setNodes,
    setStructure,
    setLocations,
  ]);

  return null;
};
