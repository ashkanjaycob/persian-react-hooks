import { useCallback } from "react";

const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
const tens = [
  "",
  "ده",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];
const hundreds = [
  "",
  "یکصد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];
const scales = ["", "هزار", "میلیون", "میلیارد"];

export function useNumberToWordsFa() {
  const toWords = useCallback((num: number): string => {
    if (num === 0) return "صفر";
    const parts: string[] = [];
    let i = 0;
    while (num > 0) {
      const chunk = num % 1000;
      if (chunk) {
        const h = Math.floor(chunk / 100);
        const t = Math.floor((chunk % 100) / 10);
        const o = chunk % 10;
        const str = [hundreds[h], tens[t], ones[o]].filter(Boolean).join(" و ");
        parts.unshift(`${str} ${scales[i]}`.trim());
      }
      num = Math.floor(num / 1000);
      i++;
    }
    return parts.join(" و ");
  }, []);
  return { toWords };
}
