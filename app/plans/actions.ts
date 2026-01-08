"use server";

import { Plan, createMockPlan } from "@/types/plan";
import { MOCK_NODES, MOCK_STRUCTURE } from "./_mock/MOCK_NODES";
import { PlanStore } from "./_store";
import { MOCK_LOCATIONS } from "./_mock/MOCK_LOCATIONS";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  InvitationFormData,
  InvitationFormSchema,
} from "./_types/InvitationFormData";

export const getPlan = async (
  planId: Plan["id"]
): Promise<Partial<PlanStore & Plan>> => {
  // TODO: 型も適当なので後でいい感じに定義する
  // TODO: 予定を取得する処理を実装する

  return {
    planInfo: {
      ...createMockPlan(),
      id: planId,
    },
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

interface InvitationResult {
  ok: boolean;
  message: string;
}
export async function sendInvitation(
  data: InvitationFormData,
  planId: string,
  path?: string
): Promise<InvitationResult> {
  const failedMessage = (message: string) =>
    `招待の送信に失敗しました: ${message}`;
  const successMessage = "招待を送信しました";
  try {
    const result = InvitationFormSchema.safeParse(data);
    if (!result.success) {
      return {
        ok: false,
        message: failedMessage(result.error.message),
      };
    }

    const cookie = (await cookies()).toString();
    const res = await fetchWrapper.post(
      ApiRoutes.invitation.invitation(planId),
      { ...data, planId },
      true,
      {
        credentials: "include",
        headers: {
          Cookie: cookie,
        },
      }
    );
    const ok = res.ok;
    const message = ok
      ? successMessage
      : failedMessage(res.statusText || "不明なエラー");
    if (ok && path) {
      revalidatePath(path);
    }
    return { ok, message };
  } catch (e) {
    return { ok: false, message: failedMessage(String(e)) };
  }
}
