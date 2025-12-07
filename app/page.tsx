import CommonButton from "@/components/CommonButton";
import CommonText from "@/components/CommonText";

export interface TopPageProps {
  a: undefined;
}

const TopPage: React.FC<TopPageProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 items-center justify-center">
        <CommonText className="text-8xl">
          Planning Tool
        </CommonText>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <CommonButton variant="contain" color="primary" size="xl">
          ログイン
        </CommonButton>
        <CommonButton variant="outline" color="primary" size="lg">
          アカウント新規作成
        </CommonButton>
      </div>

    </div>
  );
};

export default TopPage;
