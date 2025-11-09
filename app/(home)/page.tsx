import CommonText from "@/components/CommonText";

export interface HomePageProps {
  a: undefined;
}

const HomePage: React.FC<HomePageProps> = ({ }) => {
  return <CommonText level="h1" >
    Home Page
  </CommonText>;
}

export default HomePage;