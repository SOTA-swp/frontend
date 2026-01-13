import type { Metadata } from "next";
import "./globals.css";
import Modal from "@/components/modal/Modal";
import { AppStoreProvider } from "@/store/AppStoreProvider";
import CustomToaster from "@/components/CustomToaster";
import { fontVariables } from "@/lib/fonts";
import PROJECT_NAME from "@/consts/PROJECT_NAME";

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description:
    "旅行計画を一緒に作ろう！共同編集型の旅行プラン作成サービスです。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppStoreProvider>
        <body className={`${fontVariables} antialiased overflow-x-clip`}>
          {children}
          <Modal />
          <CustomToaster />
        </body>
      </AppStoreProvider>
    </html>
  );
}
