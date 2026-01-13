import { UserSchema } from "@/types/user";

export const InvitationFormSchema = UserSchema.pick({
  email: true,
});

export type InvitationFormData = {
  email: string;
};
