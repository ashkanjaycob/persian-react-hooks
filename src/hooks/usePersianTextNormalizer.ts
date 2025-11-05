export const usePersianTextNormalizer = (text: string): string => {
  if (!text) return "";

  return (
    text
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")

      .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))

      .replace(/[0-9]/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728))

      .replace(/[A-Za-z]/g, "")
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}\[\]\\\/]/g, "")

      .replace(/[‌\s]+/g, " ")

      // trim
      .trim()
  );
};
