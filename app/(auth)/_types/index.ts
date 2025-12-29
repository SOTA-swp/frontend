import { UserSchema } from "@/types/user";
import z from "zod";

export const RegisterFormSchema = UserSchema.pick({
  name: true,
  email: true,
}).extend({
  password: z
    .string()
    .min(6, "パスワードは6文字以上")
    .max(100, "パスワードは100文字以下"),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

export const LoginFormSchema = UserSchema.pick({
  email: true,
}).extend({
  password: z.string(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
