import CommonButton from "@/components/CommonButton";
import { Switch } from "@/components/ui/switch";
import { UserInfoBlock } from "@/components/UserInfoBlock";
import { SlArrowRight } from "react-icons/sl";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
  if (process.env.NODE_ENV !== "development") {
    return <div>Not Found</div>;
  }

  return (
    <div>
      Dev Page
      <Switch></Switch>
      <div className="flex">
        <UserInfoBlock title="タイトル" sum={999} />
      </div>
      <div className="flex margin-top-20">
        <CommonButton
          size="md"
          variant="primary"
          icon={
            <span>
              <SlArrowRight />
            </span>
          }
          text="Button"
        />
      </div>
    </div>
  );
};

export default DevPage;
