export default interface UserType {
  id: string;
  googleUserId: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

export const createMockUser = (num: number = 0): UserType => ({
  id: `mock-user-id${num}`,
  googleUserId: "mock-google-user-id",
  name: `モックユーザー${num}`,
  email: `mock-mail${num}@gmail.com`,
  picture: "/user.png",
  createdAt: "2025-11-09T12:00:00.000Z",
  updatedAt: "2025-11-09T12:00:00.000Z",
});
