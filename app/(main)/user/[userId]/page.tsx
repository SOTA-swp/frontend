import CommonText from "@/components/CommonText";

export interface UserPageProps {
  a: undefined;
}

const UserPage: React.FC<UserPageProps> = ({}) => {
  return (
    <CommonText level="h1">
      Home Page
      <div className="h-[200vh]" />
    </CommonText>
  );
};

export default UserPage;
