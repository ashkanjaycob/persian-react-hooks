import { useCallback, useEffect, useState } from "react";

// Utility helpers
const toPersianDigits = (n: number | string) =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isTomorrow = (now: Date, target: Date) => {
  const diff = target.getTime() - now.getTime();
  return (
    diff > 0 &&
    diff < 1000 * 60 * 60 * 24 &&
    target.getDate() === now.getDate() + 1
  );
};

const isYesterday = (now: Date, target: Date) => {
  const diff = now.getTime() - target.getTime();
  return (
    diff > 0 &&
    diff < 1000 * 60 * 60 * 48 &&
    target.getDate() === now.getDate() - 1
  );
};

export function useRelativeTimeFa(autoUpdate = false) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!autoUpdate) return;
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, [autoUpdate]);

  const toRelativeTime = useCallback(
    (input: string | Date) => {
      const currentDate = now;
      const targetDate = new Date(input);
      const diffMs = targetDate.getTime() - currentDate.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      let displayText = "";

      // ---------- آینده ----------
      if (diffMs > 0) {
        if (diffDays > 7) {
          displayText = `${toPersianDigits(diffDays)} روز دیگر`;
        } else if (diffDays >= 2) {
          displayText = `${toPersianDigits(diffDays)} روز دیگر`;
        } else if (isTomorrow(currentDate, targetDate)) {
          displayText = "فردا";
        } else if (isSameDay(currentDate, targetDate)) {
          if (diffHours >= 12) {
            displayText = "بیشتر از ۱۲ ساعت آینده";
          } else if (diffHours >= 1) {
            displayText = `${toPersianDigits(diffHours)} ساعت آینده`;
          } else if (diffMinutes >= 1) {
            displayText = `${toPersianDigits(diffMinutes)} دقیقه دیگر`;
          } else {
            displayText = "چند لحظه دیگر";
          }
        } else {
          displayText = `${toPersianDigits(diffDays)} روز دیگر`;
        }
      }

      // ---------- گذشته ----------
      else {
        if (Math.abs(diffDays) > 7) {
          displayText = new Intl.DateTimeFormat("fa-IR", {
            calendar: "persian",
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(targetDate);
        } else if (Math.abs(diffDays) === 7) {
          displayText = `${toPersianDigits(7)} روز گذشته`;
        } else if (Math.abs(diffDays) >= 2) {
          displayText = `${toPersianDigits(Math.abs(diffDays))} روز پیش`;
        } else if (isYesterday(currentDate, targetDate)) {
          displayText = "دیروز";
        } else if (isSameDay(currentDate, targetDate)) {
          if (diffHours <= -12) {
            displayText = "امروز";
          } else if (diffHours <= -1) {
            displayText = `${toPersianDigits(Math.abs(diffHours))} ساعت پیش`;
          } else if (diffMinutes <= -1) {
            displayText = `${toPersianDigits(Math.abs(diffMinutes))} دقیقه پیش`;
          } else {
            displayText = "چند لحظه پیش";
          }
        } else {
          displayText = `${toPersianDigits(Math.abs(diffDays))} روز پیش`;
        }
      }

      return displayText;
    },
    [now]
  );

  return { toRelativeTime };
}
