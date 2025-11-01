import { useCallback } from "react";

export function usePersianDate() {
  const toPersianDate = useCallback(
    (date: string | Date, opts?: Intl.DateTimeFormatOptions) => {
      const d = new Date(date);
      return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...opts,
      }).format(d);
    },
    []
  );
  return { toPersianDate };
}
