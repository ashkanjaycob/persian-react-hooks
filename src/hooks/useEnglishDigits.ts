import { useCallback } from "react";

const ENGLISH_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function useEnglishDigits() {
  const toEnglishDigits = useCallback((input: string): string => {
    return input.replace(
      /[۰-۹]/g,
      (d) => ENGLISH_DIGITS[d.charCodeAt(0) - 1776] ?? d
    );
  }, []);
  return { toEnglishDigits };
}
