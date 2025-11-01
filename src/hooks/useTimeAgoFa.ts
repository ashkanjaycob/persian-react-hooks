import { useCallback, useEffect, useState } from "react";

export function useTimeAgoFa(date: string | Date, autoUpdate = false) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!autoUpdate) return;
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, [autoUpdate]);

  const toTimeAgo = useCallback(
    (target: string | Date) => {
      const current = now;
      const d = new Date(target);
      const diff = current.getTime() - d.getTime();
      const min = Math.floor(diff / 60000);
      const hour = Math.floor(min / 60);
      const day = Math.floor(hour / 24);

      if (Math.abs(min) < 1) return "چند لحظه پیش";
      if (day >= 1) return `${day} روز پیش`;
      if (hour >= 1) return `${hour} ساعت پیش`;
      if (min >= 1) return `${min} دقیقه پیش`;
      return "لحظاتی پیش";
    },
    [now]
  );

  return { toTimeAgo };
}
