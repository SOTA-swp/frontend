import CommonText from "@/components/CommonText";

export interface TopPageProps {
  a: undefined;
}

const TopPage: React.FC<TopPageProps> = ({}) => {
  return (
    <CommonText level="h1">
      Home Page
      <div className="h-[200vh]" />
    </CommonText>
  );
};

export default TopPage;
