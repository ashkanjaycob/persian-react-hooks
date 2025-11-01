import { useCallback, useState, useEffect } from 'react';

// src/hooks/usePersianDigits.ts
var PERSIAN_DIGITS = ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"];
function usePersianDigits() {
  const toPersianDigits = useCallback(
    (value, options) => {
      const str = value.toString().replace(/\d/g, (d) => PERSIAN_DIGITS[+d]);
      return options?.comma ? str.replace(/\B(?=(\d{3})+(?!\d))/g, "\u066C") : str;
    },
    []
  );
  return { toPersianDigits };
}
var ENGLISH_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function useEnglishDigits() {
  const toEnglishDigits = useCallback((input) => {
    return input.replace(
      /[۰-۹]/g,
      (d) => ENGLISH_DIGITS[d.charCodeAt(0) - 1776] ?? d
    );
  }, []);
  return { toEnglishDigits };
}
function usePersianDate() {
  const toPersianDate = useCallback(
    (date, opts) => {
      const d = new Date(date);
      return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...opts
      }).format(d);
    },
    []
  );
  return { toPersianDate };
}
function useTimeAgoFa(date, autoUpdate = false) {
  const [now, setNow] = useState(() => /* @__PURE__ */ new Date());
  useEffect(() => {
    if (!autoUpdate) return;
    const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(t);
  }, [autoUpdate]);
  const toTimeAgo = useCallback(
    (target) => {
      const current = now;
      const d = new Date(target);
      const diff = current.getTime() - d.getTime();
      const min = Math.floor(diff / 6e4);
      const hour = Math.floor(min / 60);
      const day = Math.floor(hour / 24);
      if (Math.abs(min) < 1) return "\u0686\u0646\u062F \u0644\u062D\u0638\u0647 \u067E\u06CC\u0634";
      if (day >= 1) return `${day} \u0631\u0648\u0632 \u067E\u06CC\u0634`;
      if (hour >= 1) return `${hour} \u0633\u0627\u0639\u062A \u067E\u06CC\u0634`;
      if (min >= 1) return `${min} \u062F\u0642\u06CC\u0642\u0647 \u067E\u06CC\u0634`;
      return "\u0644\u062D\u0638\u0627\u062A\u06CC \u067E\u06CC\u0634";
    },
    [now]
  );
  return { toTimeAgo };
}
var ones = ["", "\u06CC\u06A9", "\u062F\u0648", "\u0633\u0647", "\u0686\u0647\u0627\u0631", "\u067E\u0646\u062C", "\u0634\u0634", "\u0647\u0641\u062A", "\u0647\u0634\u062A", "\u0646\u0647"];
var tens = [
  "",
  "\u062F\u0647",
  "\u0628\u06CC\u0633\u062A",
  "\u0633\u06CC",
  "\u0686\u0647\u0644",
  "\u067E\u0646\u062C\u0627\u0647",
  "\u0634\u0635\u062A",
  "\u0647\u0641\u062A\u0627\u062F",
  "\u0647\u0634\u062A\u0627\u062F",
  "\u0646\u0648\u062F"
];
var hundreds = [
  "",
  "\u06CC\u06A9\u0635\u062F",
  "\u062F\u0648\u06CC\u0633\u062A",
  "\u0633\u06CC\u0635\u062F",
  "\u0686\u0647\u0627\u0631\u0635\u062F",
  "\u067E\u0627\u0646\u0635\u062F",
  "\u0634\u0634\u0635\u062F",
  "\u0647\u0641\u062A\u0635\u062F",
  "\u0647\u0634\u062A\u0635\u062F",
  "\u0646\u0647\u0635\u062F"
];
var scales = ["", "\u0647\u0632\u0627\u0631", "\u0645\u06CC\u0644\u06CC\u0648\u0646", "\u0645\u06CC\u0644\u06CC\u0627\u0631\u062F"];
function useNumberToWordsFa() {
  const toWords = useCallback((num) => {
    if (num === 0) return "\u0635\u0641\u0631";
    const parts = [];
    let i = 0;
    while (num > 0) {
      const chunk = num % 1e3;
      if (chunk) {
        const h = Math.floor(chunk / 100);
        const t = Math.floor(chunk % 100 / 10);
        const o = chunk % 10;
        const str = [hundreds[h], tens[t], ones[o]].filter(Boolean).join(" \u0648 ");
        parts.unshift(`${str} ${scales[i]}`.trim());
      }
      num = Math.floor(num / 1e3);
      i++;
    }
    return parts.join(" \u0648 ");
  }, []);
  return { toWords };
}

// src/hooks/useIranianNationalId.ts
function useIranianNationalId() {
  const isValid = (input) => {
    const code = input.replace(/[^0-9]/g, "");
    if (!/^\d{10}$/.test(code)) return false;
    const check = +code[9];
    const sum = code.split("").slice(0, 9).reduce((s, d, i) => s + +d * (10 - i), 0) % 11;
    return sum < 2 && check === sum || sum >= 2 && check + sum === 11;
  };
  return { isValid };
}

// src/hooks/useIranianPhone.ts
function useIranianPhone() {
  const normalizePhone = (phone) => {
    return phone.replace(/[^\d]/g, "").replace(/^(\+98|0098|98)/, "0");
  };
  const isValidPhone = (phone) => {
    const p = normalizePhone(phone);
    return /^09\d{9}$/.test(p);
  };
  return { normalizePhone, isValidPhone };
}

// src/hooks/useBankCardValidator.ts
function useBankCardValidator() {
  const formatCard = (card) => card.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
  const isValidCard = (card) => {
    const digits = card.replace(/\D/g, "");
    if (digits.length !== 16) return false;
    let sum = 0;
    for (let i = 0; i < 16; i++) {
      let n = +digits[i];
      if (i % 2 === 0) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
    }
    return sum % 10 === 0;
  };
  return { isValidCard, formatCard };
}

// src/hooks/useTextDirection.ts
function useTextDirection() {
  const dir = (text) => {
    return /[\u0600-\u06FF]/.test(text) ? "rtl" : "ltr";
  };
  return { dir };
}

// src/hooks/useNormalizePersianText.ts
function useNormalizePersianText() {
  const normalize = (text) => {
    return text.replace(/ي/g, "\u06CC").replace(/ك/g, "\u06A9").replace(/‌/g, " ").trim();
  };
  return { normalize };
}
function usePersianKeyboard() {
  const [isPersianTyping, setIsPersianTyping] = useState(false);
  const detectLanguage = (value) => {
    setIsPersianTyping(/[\u0600-\u06FF]/.test(value));
  };
  return { isPersianTyping, detectLanguage };
}

// src/hooks/usePersianPaginationLabels.ts
function usePersianPaginationLabels() {
  const labels = {
    next: "\u0628\u0639\u062F\u06CC",
    prev: "\u0642\u0628\u0644\u06CC",
    first: "\u0627\u0648\u0644\u06CC\u0646",
    last: "\u0622\u062E\u0631\u06CC\u0646",
    page: "\u0635\u0641\u062D\u0647",
    of: "\u0627\u0632",
    rowsPerPage: "\u062A\u0639\u062F\u0627\u062F \u062F\u0631 \u0635\u0641\u062D\u0647",
    noData: "\u062F\u0627\u062F\u0647\u200C\u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F",
    loading: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC..."
  };
  return { labels };
}

export { useBankCardValidator, useEnglishDigits, useIranianNationalId, useIranianPhone, useNormalizePersianText, useNumberToWordsFa, usePersianDate, usePersianDigits, usePersianKeyboard, usePersianPaginationLabels, useTextDirection, useTimeAgoFa };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map