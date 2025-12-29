import CommonText from "@/components/CommonText";
import LoginForm from "./_component/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen justify-evenly">
      <div className="flex  items-center justify-center">
        <CommonText className="items-center" level="h1">
          ログイン
        </CommonText>
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
