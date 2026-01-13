export function formatDataDisplay(timeStamp: string) {
  const data = new Date(timeStamp);
  return data.toLocaleDateString();
}

/**
 * 2つのタイムスタンプの差を計算する関数
 *
 * @param timeStamp
 * @param timeStamp2
 */
export function subTimestamp(timeStamp: string, timeStamp2: string): string {
  const date1 = new Date(timeStamp);
  const date2 = new Date(timeStamp2);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = Math.floor(diffDays / 365);
  if (diffYears >= 1) {
    return `${diffYears}年`;
  }
  if (diffDays >= 30) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}ヶ月`;
  }
  return `${diffDays}日`;
}
