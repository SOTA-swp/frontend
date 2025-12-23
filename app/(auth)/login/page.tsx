import CommonButton from "@/components/CommonButton";
import CommonText from "@/components/CommonText";
import TextField from "@/components/TextField";

export interface TopPageProps {
  a: undefined;
}

const TopPage: React.FC<TopPageProps> = ({}) => {
  return (
    <div className="flex flex-col h-screen justify-evenly">
      <div className="flex  items-center justify-center">
        <CommonText className="items-center" level="h1">
          ログイン
        </CommonText>
      </div>

      <form className="flex flex-col gap-16 items-center">
        <div className="flex flex-col items-center gap-16 w-[500px]">
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
        <div className="flex justify-center gap-80">
          <CommonButton variant="text" color="primary" size="xs">
            アカウント新規作成
          </CommonButton>
          <CommonButton
            variant="contain"
            color="primary"
            size="lg"
            type="submit"
          >
            ログイン
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default TopPage;
