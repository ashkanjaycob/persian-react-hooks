export function useTextDirection() {
  const dir = (text: string): "rtl" | "ltr" => {
    return /[\u0600-\u06FF]/.test(text) ? "rtl" : "ltr";
  };
  return { dir };
}
