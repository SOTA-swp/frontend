import CommonHeader from "./_components/CommonHeader";
import Side from "./_components/side/Side";
import Top from "./_components/Top";
import { OpenPlanCardStoreProvider } from "./_store/OpenPlanCardStoreProvider";
import { getPlans } from "./actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <OpenPlanCardStoreProvider>
        <CommonHeader />
        <Top />
        <div className="flex p-4 gap-4">
          <Side />
          {children}
        </div>
      </OpenPlanCardStoreProvider>
    </div>
  );
}
