"use server";

import { Plan, createMockPlan } from "@/types/plan";
import { MOCK_NODES, MOCK_STRUCTURE } from "./_mock/MOCK_NODES";
import { PlanStore } from "./_store";
import { MOCK_LOCATIONS } from "./_mock/MOCK_LOCATIONS";

export const getPlan = async (
  planId: Plan["id"]
): Promise<Partial<PlanStore & Plan>> => {
  // TODO: 型も適当なので後でいい感じに定義する
  // TODO: 予定を取得する処理を実装する

  return {
    ...createMockPlan(),
    id: planId,
    nodes: MOCK_NODES.reduce(
      (acc, node) => {
        acc[node.id] = node;
        return acc;
      },
      {} as Record<string, (typeof MOCK_NODES)[number]>
    ),
    structure: MOCK_STRUCTURE,
    locations: MOCK_LOCATIONS.reduce(
      (acc, location) => {
        acc[location.id] = location;
        return acc;
      },
      {} as Record<string, (typeof MOCK_LOCATIONS)[number]>
    ),
  };
};
