"use server";

import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import {
  LoginFormData,
  LoginFormSchema,
  RegisterFormData,
  RegisterFormSchema,
} from "./_types";

export interface AuthResponse {
  ok: boolean;
  message?: string;
}

export const registerUser = async (
  registerData: RegisterFormData
): Promise<AuthResponse> => {
  const result = RegisterFormSchema.safeParse(registerData);
  if (!result.success) {
    return { ok: false, message: "不正な登録データです" };
  }

  const res = await fetchWrapper.post(
    ApiRoutes.auth.register,
    registerData,
    true
  );
  const data = await res.json();
  const formatResponse: AuthResponse = {
    ok: res.ok,
    message: data.message,
  };
  return formatResponse;
};

export const loginUser = async (
  loginData: LoginFormData
): Promise<AuthResponse> => {
  const result = LoginFormSchema.safeParse(loginData);
  if (!result.success) {
    return { ok: false, message: "不正なログインデータです" };
  }

  const res = await fetchWrapper.post(ApiRoutes.auth.login, loginData, true);
  const data = await res.json();
  const formatResponse: AuthResponse = {
    ok: res.ok,
    message: data.message,
  };
  return formatResponse;
};
