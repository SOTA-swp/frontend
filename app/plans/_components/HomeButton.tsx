import Logo from "@/components/Logo/Logo";
import LAYER from "@/consts/LAYER";
import PATH from "@/consts/PATH";
import Link from "next/link";

function HomeButton() {
  return (
    <Link
      title={"ホームに戻る"}
      href={PATH.TOP}
      className="fixed top-0 left-0"
      style={{ zIndex: LAYER.TOP_BANNER }}>
      <div className="bg-paper/70 backdrop-blur-sm p-2 border-b border-r border-primary rounded-br-lg">
        <div className="text-lg text-primary">
          {/* TODO: ロゴに置き換える */}
          <Logo size={"xs"} />
        </div>
      </div>
    </Link>
  );
}

export default HomeButton;
