import z from "zod";
import { UserSchema } from "./user";
import { PlanSchema } from "./plan";

export const NOTIFICATION_TYPES = {
  LIKE: "LIKE",
  INVITATION: "INVITATION",
} as const;

export type NotificationType = keyof typeof NOTIFICATION_TYPES;

export const NotificationSchema = z.object({
  id: z.string(),
  type: z.enum([NOTIFICATION_TYPES.LIKE, NOTIFICATION_TYPES.INVITATION]),
  triggerUser: UserSchema.pick({ id: true, username: true, email: true }),
  invitation: z
    .object({
      id: z.string(),
      status: z.enum([]),
    })
    .optional(),
  plan: PlanSchema.pick({ id: true, title: true }).optional(),
  isRead: z.boolean(),
  createdAt: z.iso.datetime(),
});

export type NotificationData = z.infer<typeof NotificationSchema>;
