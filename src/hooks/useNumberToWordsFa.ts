import { useCallback } from "react";

const ONES = [
  "",
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه",
] as const;
const TEENS: Record<number, string> = {
  10: "ده",
  11: "یازده",
  12: "دوازده",
  13: "سیزده",
  14: "چهارده",
  15: "پانزده",
  16: "شانزده",
  17: "هفده",
  18: "هجده",
  19: "نوزده",
};
const TENS = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
] as const;
const HUNDREDS = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
] as const;
const SCALES = ["", "هزار", "میلیون", "میلیارد"] as const;

const joinW = (parts: string[]) => parts.filter(Boolean).join(" و ");

const chunkToWords = (n: number) => {
  if (n === 0) return "";
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];

  if (h) parts.push(HUNDREDS[h]);

  if (rest) {
    if (rest >= 10 && rest <= 19) {
      parts.push(TEENS[rest]);
    } else {
      const t = Math.floor(rest / 10);
      const o = rest % 10;
      if (t) parts.push(TENS[t]);
      if (o) parts.push(ONES[o]);
    }
  }
  return joinW(parts);
};

export function useNumberToWordsFa() {
  const toWords = useCallback((num: number): string => {
    if (!Number.isFinite(num) || Math.trunc(num) !== num) {
      throw new Error("فقط اعداد صحیح مجاز است.");
    }
    if (Math.abs(num) >= 1_000_000_000_000) {
      throw new Error("تا «میلیارد» پشتیبانی می‌شود.");
    }
    if (num === 0) return "صفر";
    if (num < 0) return "منفی " + toWords(-num);

    const parts: string[] = [];
    let n = num;
    let i = 0;

    while (n > 0) {
      const chunk = n % 1000;
      if (chunk) {
        if (i === 1 && chunk === 1) {
          parts.unshift("هزار");
        } else {
          const words = chunkToWords(chunk);
          parts.unshift(SCALES[i] ? `${words} ${SCALES[i]}` : words);
        }
      }
      n = Math.floor(n / 1000);
      i++;
    }

    return joinW(parts);
  }, []);

  return { toWords };
}
