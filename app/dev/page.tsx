import CommonButton from "@/components/CommonButton";
import { Switch } from "@/components/ui/switch";
import { UserInfoBlock } from "@/components/UserInfoBlock";
import { MdChevronRight } from "react-icons/md";
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
      <div className="flex items-end">
        <CommonButton
          size="xs"
          variant="contain"
          color="error"
          icon={<MdChevronRight />}
          text="Button"
        />
        <CommonButton
          size="sm"
          variant="outline"
          color="error"
          icon={<MdChevronRight />}
          text="Button"
        />
        <CommonButton
          size="md"
          variant="text"
          color="error"
          icon={<MdChevronRight />}
          text="Button"
        />
        <CommonButton
          size="lg"
          variant="text"
          color="error"
          icon={<MdChevronRight />}
          text="Button"
        />
        <CommonButton
          size="xl"
          variant="text"
          color="primary"
          icon={<MdChevronRight />}
          text="Button"
        />
      </div>
    </div>
  );
};

export default DevPage;
