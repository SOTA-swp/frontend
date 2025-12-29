import CommonText from "@/components/CommonText";
import RegisterForm from "./_component/RegisterForm";

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
