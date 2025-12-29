"use client";

import CommonButton from "@/components/CommonButton";
import TextField from "@/components/TextField";
import PATH from "@/consts/PATH";
import { UserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const LoginFormSchema = UserSchema.pick({
  email: true,
}).extend({
  password: z.string(),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-16 items-center"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-16 w-[500px]">
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
