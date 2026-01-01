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
        {/* TODO: オススメの計画を渡す(ここでやるべきかは要検討) */}
        <Top data={(await getPlans("", 0, 10)).planData} />
        <div className="flex p-4 gap-4">
          <Side />
          {children}
        </div>
      </OpenPlanCardStoreProvider>
    </div>
  );
}
