import CommonButton from "@/components/CommonButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-4 left-4">
        <CommonButton variant="text" color="gray" size="md" icon>＜ 戻る</CommonButton>
      </div>
      <div>{children}</div>
    </>
  );
}
