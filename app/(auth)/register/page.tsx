import CommonText from "@/components/CommonText";
import RegisterForm from "./_component/RegisterForm";
import PROJECT_NAME from "@/consts/PROJECT_NAME";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `アカウント作成 ${PROJECT_NAME}`,
  description: `${PROJECT_NAME}のアカウント作成ページです。`,
};

const RegisterPage = () => {
  return (
    <div className="flex flex-col h-screen justify-evenly">
      <div className="flex items-center justify-center">
        <CommonText className="items-center" level="h1">
          アカウント新規作成
        </CommonText>
      </div>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
