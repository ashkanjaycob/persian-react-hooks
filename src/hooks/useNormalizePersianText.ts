export function useNormalizePersianText() {
  const normalize = (text: string): string => {
    return text.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/‌/g, " ").trim();
  };
  return { normalize };
}
