"use client";

import CommonButton from "@/components/CommonButton";
import TextField from "@/components/TextField";
import PATH from "@/consts/PATH";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginFormSchema } from "../../_types";
import { loginUser } from "../../actions";
import { useRouter } from "next/navigation";

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

  const onSubmit = async (data: LoginFormData) => {
    const res = await loginUser(data);
    if (!res.ok) {
      alert(`ログインに失敗しました: ${res.message}`);
      return;
    }
    router.push(PATH.USER("me"));
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
