import CommonText from "@/components/CommonText";

export interface HomePageProps {
  a: undefined;
}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <CommonText level="h1">
      Home Page
      <div className="h-[200vh]" />
    </CommonText>
  );
};

export default HomePage;
