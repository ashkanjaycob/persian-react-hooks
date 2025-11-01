import { useCallback } from "react";

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function usePersianDigits() {
  const toPersianDigits = useCallback(
    (value: string | number, options?: { comma?: boolean }): string => {
      const str = value.toString().replace(/\d/g, (d) => PERSIAN_DIGITS[+d]);
      return options?.comma ? str.replace(/\B(?=(\d{3})+(?!\d))/g, "٬") : str;
    },
    []
  );
  return { toPersianDigits };
}
