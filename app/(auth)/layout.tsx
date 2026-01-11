import CommonButton from "@/components/CommonButton";
import PATH from "@/consts/PATH";
import { MdKeyboardArrowLeft } from "react-icons/md";
import LoginCheck from "./_component/LoginCheck";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoginCheck />
      <div className="fixed top-4 left-4">
        <CommonButton
          variant="text"
          color="gray"
          size="md"
          icon={<MdKeyboardArrowLeft />}
          iconPosition="left"
          href={PATH.TOP}>
          トップへ
        </CommonButton>
      </div>
      <div>{children}</div>
    </>
  );
}
