import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  googleUserId: z.string(),
  username: z
    .string()
    .min(1, "ユーザー名は1文字以上")
    .max(50, "ユーザー名は50文字以下"),
  email: z.email("有効なメールアドレスを入力してください"),
  picture: z.url(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type User = z.infer<typeof UserSchema>;

export type UserMinimal = Pick<User, "id" | "username" | "email">;

export const createMockUser = (num: number = 0): User => ({
  id: `mock-user-id${num}`,
  googleUserId: "mock-google-user-id",
  username: `モックユーザー${num}`,
  email: `mock-mail${num}@gmail.com`,
  picture: "/mock/img/user.png",
  createdAt: "2025-11-09T12:00:00.000Z",
  updatedAt: "2025-11-09T12:00:00.000Z",
});
