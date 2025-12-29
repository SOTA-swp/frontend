"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/types/user";
import CommonButton from "@/components/CommonButton";
import TextField from "@/components/TextField";
import z from "zod";

const RegisterFormSchema = UserSchema.pick({
  name: true,
  email: true,
}).extend({
  password: z
    .string()
    .min(6, "パスワードは6文字以上")
    .max(100, "パスワードは100文字以下"),
});

type RegisterFormData = z.infer<typeof RegisterFormSchema>;

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-16 items-center"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-12 w-[500px]">
        <TextField
          {...register("name")}
          helperText={errors.name?.message}
          error={!!errors.name}
          label="name"
          labelName="名前"
          placeholder="名前を入力"
          autoComplete="off"
          fullWidth
        />
        <TextField
          {...register("email")}
          helperText={errors.email?.message}
          error={!!errors.email}
          label="email"
          type="email"
          labelName="メールアドレス"
          placeholder="メールアドレスを入力"
          fullWidth
        />
        <TextField
          {...register("password")}
          helperText={errors.password?.message}
          error={!!errors.password}
          label="password"
          type="password"
          labelName="パスワード"
          placeholder="パスワードを入力"
          autoComplete="off"
          fullWidth
        />
      </div>
      <div className="flex justify-center">
        <CommonButton variant="contain" color="primary" size="lg" type="submit">
          新規作成
        </CommonButton>
      </div>
    </form>
  );
}

export default RegisterForm;
