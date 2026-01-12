"use client";
import CommonButton from "@/components/CommonButton";
import ModalAction from "@/components/modal/ModalAction";
import ModalContent from "@/components/modal/ModalContent";
import ModalTitle from "@/components/modal/ModalTitle";
import TextField from "@/components/TextField";
import PATH from "@/consts/PATH";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createPlan, editPlan } from "../actions";
import { AddPlanFormData, AddPlanFormSchema } from "../_types";
import { toast } from "sonner";
import { useAppStore } from "@/store/AppStoreProvider";

const submitMockPlan = async (length: number) => {
  const dataBank = {
    // 旅を彩る絵文字（大幅増量）
    emojis: [
      "😀",
      "🚀",
      "🌟",
      "🎉",
      "🏖️",
      "🍣",
      "🗼",
      "🗻",
      "✈️",
      "🍀",
      "🍷",
      "🏰",
      "🌊",
      "🍜",
      "🏨",
      "🚶",
      "📸",
      "⛩️",
      "🥐",
      "🍺",
      "🗿",
      "🌴",
      "🦁",
      "🚞",
      "🧣",
      "🎨",
      "🥨",
      "🍛",
      "🏕️",
      "🧖",
      "🎈",
      "🎡",
      "🌌",
      "🎋",
      "🛶",
      "🥐",
      "🍮",
      "🍇",
      "🗺️",
      "🧳",
      "🌉",
      "🌋",
      "🏜️",
      "💃",
      "🛶",
    ],

    // 全都道府県の一部 ＋ 世界の主要国（大幅増量）
    locations: [
      // 国内
      "北海道",
      "青森県",
      "岩手県",
      "宮城県",
      "秋田県",
      "山形県",
      "福島県",
      "茨城県",
      "栃木県",
      "群馬県",
      "埼玉県",
      "千葉県",
      "東京都",
      "神奈川県",
      "新潟県",
      "富山県",
      "石川県",
      "福井県",
      "山梨県",
      "長野県",
      "岐阜県",
      "静岡県",
      "愛知県",
      "三重県",
      "滋賀県",
      "京都府",
      "大阪府",
      "兵庫県",
      "奈良県",
      "和歌山県",
      "鳥取県",
      "島根県",
      "岡山県",
      "広島県",
      "山口県",
      "徳島県",
      "香川県",
      "愛媛県",
      "高知県",
      "福岡県",
      "佐賀県",
      "長崎県",
      "熊本県",
      "大分県",
      "宮崎県",
      "鹿児島県",
      "沖縄県",
      // 海外
      "アメリカ",
      "イギリス",
      "フランス",
      "ドイツ",
      "イタリア",
      "スペイン",
      "ポルトガル",
      "オランダ",
      "スイス",
      "ギリシャ",
      "トルコ",
      "エジプト",
      "モロッコ",
      "南アフリカ",
      "タイ",
      "ベトナム",
      "インド",
      "シンガポール",
      "インドネシア",
      "韓国",
      "台湾",
      "中国",
      "オーストラリア",
      "ニュージーランド",
      "カナダ",
      "メキシコ",
      "ブラジル",
      "アルゼンチン",
      "フィンランド",
      "スウェーデン",
      "アイスランド",
    ],

    // 行動テーマ（文章のバリエーション）
    themes: [
      "を遊び尽くす最高の旅",
      "の魅力を再発見する散策",
      "で過ごす大人の贅沢時間",
      "の絶品グルメを食べ尽くす会",
      "の歴史を辿るバックパッカー旅",
      "で癒やされる週末ステイ",
      "を写真に収めるフォトジェニックな旅",
      "の穴場スポットを巡る冒険",
      "の文化を体験する短期滞在",
      "の伝統に触れるディープな1日",
      "をレンタカーで縦断する旅",
      "の夜景を楽しむナイトツアー",
      "で最高の休日を過ごすためのプラン",
      "のローカル鉄道に揺られる旅",
      "で非日常を味わう体験",
    ],

    // 説明文（文末を変えることでさらにバラエティ感を出す）
    descriptions: [
      "SNSで話題の最新スポットから、地元の人しか知らない裏路地まで網羅します。",
      "忙しい毎日を忘れて、その土地ならではの空気に浸る特別なひとときを演出。",
      "予算重視でも満足度120%！効率よく観光地を巡るための鉄板ルートを提案します。",
      "現地の食文化を中心に、五感で楽しむことをテーマにしたプランです。",
      "ガイドブックには載っていない、心揺さぶられる景色を探しに行きましょう。",
      "ゆったりとした時間が流れる中で、自分を見つめ直す贅沢な旅のしおり。",
      "初心者でも安心して楽しめる、現地の移動手段やコツを詰め込みました。",
      "その土地の歴史、食、そして人々の温かさに触れる感動の連続。",
    ],
  };

  const getRandom = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const toastId = toast.loading("計画を作成中...");

  for (let i = 0; i < length; i++) {
    const emoji = getRandom(dataBank.emojis);
    const location = getRandom(dataBank.locations);
    const theme = getRandom(dataBank.themes);

    const randomTitle = `${emoji} ${location}${theme}`;
    const randomDescription = getRandom(dataBank.descriptions);

    toast(`生成中 (${i + 1}/${length}): ${randomTitle}`, { id: toastId }); // 進行状況をコンソールに表示

    const { newPlan } = await createPlan({
      title: randomTitle,
      description: randomDescription,
    });

    const res = await editPlan(newPlan?.id || "", {
      title: randomTitle,
      description: randomDescription,
      isPublic: true,
    });
    console.log(res);
  }

  toast.success("モック計画の作成が完了しました！", { id: toastId });
};

interface AddPlanModalProps {
  initData?: Partial<AddPlanFormData>;
}

function AddPlanModal({ initData }: AddPlanModalProps) {
  const closeModal = useAppStore((state) => state.closeModal);
  const {
    register,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm<AddPlanFormData>({
    resolver: zodResolver(AddPlanFormSchema),
    mode: "onChange",
    defaultValues: {
      ...initData,
      title: "",
      description: "",
    },
  });
  const router = useRouter();

  const onsubmit = async (data: AddPlanFormData) => {
    const toastId = toast.loading("計画を作成中...");
    try {
      const { ok, message, newPlan } = await createPlan(data);

      if (!ok) {
        toast.error(`計画の作成に失敗しました: ${message}`, {
          id: toastId,
        });
        return;
      }

      toast.success("計画を作成しました！", { id: toastId });
      router.push(PATH.PLAN_EDIT(newPlan?.id || ""));
      closeModal();
    } catch (e) {
      toast.error(
        `計画の作成に失敗しました: ${e instanceof Error ? e.message : "不明なエラー"}`,
        {
          id: toastId,
        }
      );
      console.error(e);
    }
  };

  return (
    <ModalContent
      closeModal={closeModal}
      as={"form"}
      onSubmit={handleSubmit(onsubmit)}>
      <ModalTitle>計画を作成</ModalTitle>
      <div className="px-4 flex flex-col gap-6">
        <TextField
          {...register("title")}
          helperText={errors.title?.message}
          error={!!errors.title}
          label="計画名"
          placeholder="3泊4日の京都旅行"
          fullWidth
        />
        <TextField
          {...register("description")}
          helperText={errors.description?.message}
          error={!!errors.description}
          label="説明"
          placeholder="京都での観光スポットやグルメを楽しむ最高の計画！"
          textarea
          rows={4}
          fullWidth
          style={{ resize: "none" }}
        />
      </div>
      <ModalAction>
        <CommonButton
          type="button"
          modal
          variant="outline"
          onClick={closeModal}>
          キャンセル
        </CommonButton>
        <CommonButton
          type="submit"
          modal
          disabled={
            !isDirty ||
            isSubmitting ||
            isSubmitSuccessful ||
            Object.keys(errors).length > 0
          }>
          作成
        </CommonButton>
      </ModalAction>
    </ModalContent>
  );
}

export default AddPlanModal;
