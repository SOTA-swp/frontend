import LAYER from "@/consts/LAYER";
import PATH from "@/consts/PATH";
import Link from "next/link";
import { MdAirplanemodeActive } from "react-icons/md";

function HomeButton() {
  return (
    <div className="fixed top-0 left-0" style={{ zIndex: LAYER.TOP_BANNER }}>
      <div className="bg-paper/70 backdrop-blur-sm p-2 border-b border-r border-primary rounded-br-lg">
        <Link
          title={"ホームに戻る"}
          href={PATH.TOP}
          className="text-lg text-primary">
          {/* TODO: ロゴに置き換える */}
          <MdAirplanemodeActive />
        </Link>
      </div>
    </div>
  );
}

export default HomeButton;
