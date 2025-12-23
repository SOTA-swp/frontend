import CommonButton from "@/components/CommonButton";
import CommonText from "@/components/CommonText";
import TextField from "@/components/TextField";

export interface TopPageProps {
  a: undefined;
}

const RegisterPage: React.FC<TopPageProps> = ({}) => {
  return (
    <div className="flex flex-col h-screen justify-evenly">
      <div className="flex items-center justify-center">
        <CommonText className="items-center" level="h1">
          アカウント新規作成
        </CommonText>
      </div>

      <form className="flex flex-col gap-16 items-center">
        <div className="flex flex-col items-center gap-12 w-[500px]">
          <TextField
            label="name"
            labelName="名前"
            placeholder="名前を入力"
            fullWidth
          />
          <TextField
            label="mail_address"
            labelName="メールアドレス"
            placeholder="メールアドレスを入力"
            fullWidth
          />
          <TextField
            label="password"
            labelName="パスワード"
            placeholder="パスワードを入力"
            fullWidth
          />
        </div>
        <div className="flex justify-center">
          <CommonButton
            variant="contain"
            color="primary"
            size="lg"
            type="submit"
          >
            新規作成
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
