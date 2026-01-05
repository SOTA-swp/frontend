"use client";

import CommonButton from "@/components/CommonButton";
import TextField from "@/components/TextField";
import PATH from "@/consts/PATH";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginFormSchema } from "../../_types";
import { useRouter } from "next/navigation";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { ApiRoutes } from "api-contract";
import { useAppStore } from "@/store/AppStoreProvider";
import { toast } from "sonner";

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();
  const refetch = useAppStore((state) => state.refetch);

  const onSubmit = async (data: LoginFormData) => {
    const toastId = toast.loading("ログイン中...");
    const res = await fetchWrapper.post(ApiRoutes.auth.login, data);

    // ログイン処理が失敗した場合
    if (!res.ok) {
      const message = (await res.json())?.message || res.statusText;
      toast.error(`ログインに失敗しました: ${message}`, { id: toastId });
      return;
    }

    // ログイン処理が成功した場合、ユーザーデータを再取得
    const ok = await refetch();

    if (ok) {
      // ユーザーデータの再取得が成功した場合、ユーザーページへ遷移
      toast.success("ログインに成功しました！ ユーザーページへ移動します...", {
        id: toastId,
      });
      router.push(PATH.USER());
    } else {
      // 失敗した場合、エラートーストを表示してログインページへ遷移
      toast.error(
        "ユーザーデータの取得に失敗しました。再度ログインページへ移動します。",
        { id: toastId }
      );
      router.push(PATH.LOGIN);
    }
  };

  return (
    <form
      className="flex flex-col gap-16 items-center"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-16 w-125">
        <TextField
          {...register("email")}
          helperText={errors.email?.message}
          error={!!errors.email}
          type="email"
          label="email"
          labelName="メールアドレス"
          placeholder="メールアドレスを入力"
          fullWidth
        />
        <TextField
          {...register("password")}
          helperText={errors.password?.message}
          error={!!errors.password}
          type="password"
          label="password"
          labelName="パスワード"
          placeholder="パスワードを入力"
          fullWidth
        />
      </div>
      <div className="flex justify-center gap-80">
        <CommonButton
          variant="text"
          color="primary"
          size="xs"
          href={PATH.REGISTER}>
          アカウント新規作成
        </CommonButton>
        <CommonButton variant="contain" color="primary" size="lg" type="submit">
          ログイン
        </CommonButton>
      </div>
    </form>
  );
}

export default LoginForm;
