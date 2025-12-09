import CommonButton from "@/components/CommonButton";
import CommonText from "@/components/CommonText";
import PROJECT_NAME from "@/consts/PROJECT_NAME";

export interface TopPageProps {
  a: undefined;
}

const TopPage: React.FC<TopPageProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center">
        <CommonText level="h1" className="items-center">
          {PROJECT_NAME}
        </CommonText>
      </div>

      <div className="flex-1 flex flex-col items-center gap-12">
        <CommonButton variant="contain" color="primary" size="xl">
          <div className="px-32">ログイン</div>
        </CommonButton>
        <CommonButton variant="outline" color="primary" size="md">
          <div className="px-16">アカウント新規作成</div>
        </CommonButton>
      </div>
    </div>
  );
};

export default TopPage;
