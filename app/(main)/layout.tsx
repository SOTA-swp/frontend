import CommonHeader from "./_components/CommonHeader";
import Side from "./_components/side/Side";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CommonHeader />
      <div className="flex p-4 pr-0 gap-4">
        <Side />
        {children}
      </div>
    </div>
  );
}
