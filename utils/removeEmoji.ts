// 絵文字を取り除く関数
export const removeEmoji = (value: string) => {
  if (!value) return "";

  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(value));
  const firstChar = getFirstChar(value);

  return /^\p{Extended_Pictographic}/u.test(firstChar)
    ? segments
        .slice(1)
        .map((s) => s.segment)
        .join("")
    : value;
};

export const getFirstChar = (value: string) => {
  if (!value) return "";

  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(value));
  return segments[0]?.segment || "";
};
