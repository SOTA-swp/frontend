import CommonButton from "@/components/CommonButton";
import CommonText from "@/components/CommonText";
import PATH from "@/consts/PATH";
import PROJECT_NAME from "@/consts/PROJECT_NAME";
import LoginCheck from "./(auth)/_component/LoginCheck";
import Logo from "@/components/Logo/Logo";

export interface TopPageProps {
  a: undefined;
}

const TopPage: React.FC<TopPageProps> = ({}) => {
  return (
    <>
      <LoginCheck />
      <main className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="max-w-7xl w-full mx-auto px-8">
          <div className="flex items-end justify-between border-b border-border pb-12 animate-fade-in">
            <div className="flex items-center gap-8">
              <div className="p-6 bg-primary rounded-lg">
                <Logo className="text-[80px] text-paper" />
              </div>
              <div>
                <CommonText
                  level="h1"
                  className="text-5xl font-bold text-text-primary mb-3">
                  {PROJECT_NAME}
                </CommonText>
                <p className="text-xl text-text-secondary">
                  あなたの旅を計画し、共有し、実現する
                </p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <CommonButton
                href={PATH.LOGIN}
                variant="contain"
                color="primary"
                size="lg"
                modal>
                ログイン
              </CommonButton>
              <CommonButton
                href={PATH.REGISTER}
                variant="outline"
                color="primary"
                size="lg"
                modal>
                新規登録
              </CommonButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TopPage;
