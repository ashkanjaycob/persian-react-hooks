import { useCallback, useState, useEffect } from 'react';

// src/hooks/useBankCardValidator.ts
var BIN6_TO_BANK = {
  "603799": {
    id: "melli",
    fa: "\u0628\u0627\u0646\u06A9 \u0645\u0644\u06CC \u0627\u06CC\u0631\u0627\u0646",
    en: "Bank Melli Iran",
    bin: "603799"
  },
  "589210": { id: "sepah", fa: "\u0628\u0627\u0646\u06A9 \u0633\u067E\u0647", en: "Bank Sepah", bin: "589210" },
  "603769": {
    id: "saderat",
    fa: "\u0628\u0627\u0646\u06A9 \u0635\u0627\u062F\u0631\u0627\u062A \u0627\u06CC\u0631\u0627\u0646",
    en: "Bank Saderat Iran",
    bin: "603769"
  },
  "610433": { id: "mellat", fa: "\u0628\u0627\u0646\u06A9 \u0645\u0644\u062A", en: "Bank Mellat", bin: "610433" },
  "627353": {
    id: "tejarat",
    fa: "\u0628\u0627\u0646\u06A9 \u062A\u062C\u0627\u0631\u062A",
    en: "Bank Tejarat",
    bin: "627353"
  },
  "585983": {
    id: "tejarat",
    fa: "\u0628\u0627\u0646\u06A9 \u062A\u062C\u0627\u0631\u062A",
    en: "Bank Tejarat",
    bin: "585983"
  },
  "603770": {
    id: "keshavarzi",
    fa: "\u0628\u0627\u0646\u06A9 \u06A9\u0634\u0627\u0648\u0631\u0632\u06CC",
    en: "Agricultural Bank",
    bin: "603770"
  },
  "628023": { id: "maskan", fa: "\u0628\u0627\u0646\u06A9 \u0645\u0633\u06A9\u0646", en: "Bank Maskan", bin: "628023" },
  "627760": {
    id: "postbank",
    fa: "\u067E\u0633\u062A \u0628\u0627\u0646\u06A9 \u0627\u06CC\u0631\u0627\u0646",
    en: "Post Bank Iran",
    bin: "627760"
  },
  "502908": {
    id: "tosee-taavon",
    fa: "\u0628\u0627\u0646\u06A9 \u062A\u0648\u0633\u0639\u0647 \u062A\u0639\u0627\u0648\u0646",
    en: "Bank Tose'e Ta'avon",
    bin: "502908"
  },
  "627412": {
    id: "en",
    fa: "\u0628\u0627\u0646\u06A9 \u0627\u0642\u062A\u0635\u0627\u062F \u0646\u0648\u06CC\u0646",
    en: "Eghtesad Novin Bank",
    bin: "627412"
  },
  "622106": {
    id: "parsian",
    fa: "\u0628\u0627\u0646\u06A9 \u067E\u0627\u0631\u0633\u06CC\u0627\u0646",
    en: "Parsian Bank",
    bin: "622106"
  },
  "502229": {
    id: "pasargad",
    fa: "\u0628\u0627\u0646\u06A9 \u067E\u0627\u0633\u0627\u0631\u06AF\u0627\u062F",
    en: "Bank Pasargad",
    bin: "502229"
  },
  "627488": {
    id: "karafarin",
    fa: "\u0628\u0627\u0646\u06A9 \u06A9\u0627\u0631\u0622\u0641\u0631\u06CC\u0646",
    en: "Karafarin Bank",
    bin: "627488"
  },
  "621986": { id: "saman", fa: "\u0628\u0627\u0646\u06A9 \u0633\u0627\u0645\u0627\u0646", en: "Saman Bank", bin: "621986" },
  "639346": { id: "sina", fa: "\u0628\u0627\u0646\u06A9 \u0633\u06CC\u0646\u0627", en: "Sina Bank", bin: "639346" },
  "639607": {
    id: "sarmayeh",
    fa: "\u0628\u0627\u0646\u06A9 \u0633\u0631\u0645\u0627\u06CC\u0647",
    en: "Sarmayeh Bank",
    bin: "639607"
  },
  "504706": { id: "shahr", fa: "\u0628\u0627\u0646\u06A9 \u0634\u0647\u0631", en: "Bank Shahr", bin: "504706" },
  "502806": { id: "shahr", fa: "\u0628\u0627\u0646\u06A9 \u0634\u0647\u0631", en: "Bank Shahr", bin: "502806" },
  "502938": { id: "day", fa: "\u0628\u0627\u0646\u06A9 \u062F\u06CC", en: "Day Bank", bin: "502938" },
  "627648": {
    id: "edbi",
    fa: "\u0628\u0627\u0646\u06A9 \u062A\u0648\u0633\u0639\u0647 \u0635\u0627\u062F\u0631\u0627\u062A \u0627\u06CC\u0631\u0627\u0646",
    en: "Export Development Bank",
    bin: "627648"
  },
  "627961": {
    id: "imib",
    fa: "\u0628\u0627\u0646\u06A9 \u0635\u0646\u0639\u062A \u0648 \u0645\u0639\u062F\u0646",
    en: "Bank of Industry & Mine",
    bin: "627961"
  },
  "589463": {
    id: "refah",
    fa: "\u0628\u0627\u0646\u06A9 \u0631\u0641\u0627\u0647 \u06A9\u0627\u0631\u06AF\u0631\u0627\u0646",
    en: "Refah Bank",
    bin: "589463"
  },
  "627381": {
    id: "ansar-sepah",
    fa: "\u0628\u0627\u0646\u06A9 \u0627\u0646\u0635\u0627\u0631",
    en: "Ansar",
    bin: "627381"
  },
  "606373": {
    id: "mehr",
    fa: "\u0642\u0631\u0636\u200C\u0627\u0644\u062D\u0633\u0646\u0647 \u0645\u0647\u0631 \u0627\u06CC\u0631\u0627\u0646",
    en: "Gharz-al-Hasaneh Mehr Iran",
    bin: "606373"
  },
  "606256": {
    id: "melal",
    fa: "\u0645\u0624\u0633\u0633\u0647 \u0627\u0639\u062A\u0628\u0627\u0631\u06CC \u0645\u0644\u0644",
    en: "Melal Credit Institution",
    bin: "606256"
  },
  "639599": {
    id: "ghavamin-sepah",
    fa: "\u0642\u0648\u0627\u0645\u06CC\u0646",
    en: "Ghavamin",
    bin: "639599"
  }
};
var faDigits = "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";
var normalizeDigits = (input) => String(input).replace(/[۰-۹]/g, (d) => String(faDigits.indexOf(d))).replace(/\D/g, "");
var luhnCheck = (digits) => {
  let sum = 0;
  let doubleIt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (doubleIt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    doubleIt = !doubleIt;
  }
  return sum % 10 === 0;
};
function useBankCardValidator() {
  const formatBankCard = useCallback((card) => {
    const digits = normalizeDigits(card).slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }, []);
  const isValidBankCard = useCallback((card) => {
    const digits = normalizeDigits(card);
    if (digits.length !== 16) return false;
    if (/^(\d)\1{15}$/.test(digits)) return false;
    return luhnCheck(digits);
  }, []);
  const getBankInfo = useCallback((card) => {
    const digits = normalizeDigits(card);
    if (digits.length < 6) return null;
    return BIN6_TO_BANK[digits.slice(0, 6)] ?? null;
  }, []);
  return { isValidBankCard, formatBankCard, getBankInfo };
}

// src/hooks/useCompanyIdValidator.ts
var isValidCompanyId = (code) => {
  const normalized = code.replace(/\D/g, "");
  if (!/^\d{11}$/.test(normalized)) return false;
  const checkDigit = +normalized[10];
  const base = normalized.substring(0, 10);
  const prefix = +normalized[9] + 2;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += (+base[i] + prefix) * (11 - i) % 11;
  }
  const remainder = sum % 11;
  const control = remainder < 2 ? remainder : 11 - remainder;
  return control === checkDigit;
};

// src/hooks/useMobileValidator.ts
function useMobileValidator() {
  const formatPhone = (phone) => {
    return phone.replace(/[^\d]/g, "").replace(/^(\+98|0098|98)/, "0");
  };
  const isValidPhone = (phone) => {
    const p = formatPhone(phone);
    return /^09\d{9}$/.test(p);
  };
  return { isValidPhone, formatPhone };
}

// src/hooks/useNationalIdValidator.ts
var useNationalIdValidator = (code) => {
  const normalized = code.replace(/\D/g, "");
  if (!/^\d{10}$/.test(normalized)) return false;
  if (/^(\d)\1{9}$/.test(normalized)) return false;
  const digits = [...normalized].map(Number);
  const check = digits.pop();
  const sum = digits.reduce((acc, d, i) => acc + d * (10 - i), 0);
  const remainder = sum % 11;
  return remainder < 2 && check === remainder || remainder >= 2 && check === 11 - remainder;
};
var ONES = [
  "",
  "\u06CC\u06A9",
  "\u062F\u0648",
  "\u0633\u0647",
  "\u0686\u0647\u0627\u0631",
  "\u067E\u0646\u062C",
  "\u0634\u0634",
  "\u0647\u0641\u062A",
  "\u0647\u0634\u062A",
  "\u0646\u0647"
];
var TEENS = {
  10: "\u062F\u0647",
  11: "\u06CC\u0627\u0632\u062F\u0647",
  12: "\u062F\u0648\u0627\u0632\u062F\u0647",
  13: "\u0633\u06CC\u0632\u062F\u0647",
  14: "\u0686\u0647\u0627\u0631\u062F\u0647",
  15: "\u067E\u0627\u0646\u0632\u062F\u0647",
  16: "\u0634\u0627\u0646\u0632\u062F\u0647",
  17: "\u0647\u0641\u062F\u0647",
  18: "\u0647\u062C\u062F\u0647",
  19: "\u0646\u0648\u0632\u062F\u0647"
};
var TENS = [
  "",
  "",
  "\u0628\u06CC\u0633\u062A",
  "\u0633\u06CC",
  "\u0686\u0647\u0644",
  "\u067E\u0646\u062C\u0627\u0647",
  "\u0634\u0635\u062A",
  "\u0647\u0641\u062A\u0627\u062F",
  "\u0647\u0634\u062A\u0627\u062F",
  "\u0646\u0648\u062F"
];
var HUNDREDS = [
  "",
  "\u0635\u062F",
  "\u062F\u0648\u06CC\u0633\u062A",
  "\u0633\u06CC\u0635\u062F",
  "\u0686\u0647\u0627\u0631\u0635\u062F",
  "\u067E\u0627\u0646\u0635\u062F",
  "\u0634\u0634\u0635\u062F",
  "\u0647\u0641\u062A\u0635\u062F",
  "\u0647\u0634\u062A\u0635\u062F",
  "\u0646\u0647\u0635\u062F"
];
var SCALES = ["", "\u0647\u0632\u0627\u0631", "\u0645\u06CC\u0644\u06CC\u0648\u0646", "\u0645\u06CC\u0644\u06CC\u0627\u0631\u062F"];
var joinW = (parts) => parts.filter(Boolean).join(" \u0648 ");
var chunkToWords = (n) => {
  if (n === 0) return "";
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts = [];
  if (h) parts.push(HUNDREDS[h]);
  if (rest) {
    if (rest >= 10 && rest <= 19) {
      parts.push(TEENS[rest]);
    } else {
      const t = Math.floor(rest / 10);
      const o = rest % 10;
      if (t) parts.push(TENS[t]);
      if (o) parts.push(ONES[o]);
    }
  }
  return joinW(parts);
};
function useNumberToWordsFa() {
  const numberToWordsFa = useCallback((num) => {
    if (!Number.isFinite(num) || Math.trunc(num) !== num) {
      throw new Error("\u0641\u0642\u0637 \u0627\u0639\u062F\u0627\u062F \u0635\u062D\u06CC\u062D \u0645\u062C\u0627\u0632 \u0627\u0633\u062A.");
    }
    if (Math.abs(num) >= 1e12) {
      throw new Error("\u062A\u0627 \xAB\u0645\u06CC\u0644\u06CC\u0627\u0631\u062F\xBB \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0645\u06CC\u200C\u0634\u0648\u062F.");
    }
    if (num === 0) return "\u0635\u0641\u0631";
    if (num < 0) return "\u0645\u0646\u0641\u06CC " + numberToWordsFa(-num);
    const parts = [];
    let n = num;
    let i = 0;
    while (n > 0) {
      const chunk = n % 1e3;
      if (chunk) {
        if (i === 1 && chunk === 1) {
          parts.unshift("\u0647\u0632\u0627\u0631");
        } else {
          const words = chunkToWords(chunk);
          parts.unshift(SCALES[i] ? `${words} ${SCALES[i]}` : words);
        }
      }
      n = Math.floor(n / 1e3);
      i++;
    }
    return joinW(parts);
  }, []);
  return { numberToWordsFa };
}

// src/hooks/usePaginationLabelsFa.ts
function usePaginationLabelsFa() {
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
function usePersianDate() {
  const toDateFa = useCallback(
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
  return { toDateFa };
}

// src/hooks/usePersianTextNormalizer.ts
var usePersianTextNormalizer = (text) => {
  if (!text) return "";
  return text.replace(/ي/g, "\u06CC").replace(/ك/g, "\u06A9").replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728)).replace(/[0-9]/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728)).replace(/[A-Za-z]/g, "").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}\[\]\\\/]/g, "").replace(/[‌\s]+/g, " ").trim();
};
var toPersianDigits = (n) => String(n).replace(/\d/g, (d) => "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9"[+d]);
var isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
var isTomorrow = (now, target) => {
  const diff = target.getTime() - now.getTime();
  return diff > 0 && diff < 1e3 * 60 * 60 * 24 && target.getDate() === now.getDate() + 1;
};
var isYesterday = (now, target) => {
  const diff = now.getTime() - target.getTime();
  return diff > 0 && diff < 1e3 * 60 * 60 * 48 && target.getDate() === now.getDate() - 1;
};
function useRelativeTimeFa(autoUpdate = false) {
  const [now, setNow] = useState(() => /* @__PURE__ */ new Date());
  useEffect(() => {
    if (!autoUpdate) return;
    const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(t);
  }, [autoUpdate]);
  const toRelativeTime = useCallback(
    (input) => {
      const currentDate = now;
      const targetDate = new Date(input);
      const diffMs = targetDate.getTime() - currentDate.getTime();
      const diffMinutes = Math.floor(diffMs / 6e4);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      let displayText = "";
      if (diffMs > 0) {
        if (diffDays > 7) {
          displayText = `${toPersianDigits(diffDays)} \u0631\u0648\u0632 \u062F\u06CC\u06AF\u0631`;
        } else if (diffDays >= 2) {
          displayText = `${toPersianDigits(diffDays)} \u0631\u0648\u0632 \u062F\u06CC\u06AF\u0631`;
        } else if (isTomorrow(currentDate, targetDate)) {
          displayText = "\u0641\u0631\u062F\u0627";
        } else if (isSameDay(currentDate, targetDate)) {
          if (diffHours >= 12) {
            displayText = "\u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F1\u06F2 \u0633\u0627\u0639\u062A \u0622\u06CC\u0646\u062F\u0647";
          } else if (diffHours >= 1) {
            displayText = `${toPersianDigits(diffHours)} \u0633\u0627\u0639\u062A \u0622\u06CC\u0646\u062F\u0647`;
          } else if (diffMinutes >= 1) {
            displayText = `${toPersianDigits(diffMinutes)} \u062F\u0642\u06CC\u0642\u0647 \u062F\u06CC\u06AF\u0631`;
          } else {
            displayText = "\u0686\u0646\u062F \u0644\u062D\u0638\u0647 \u062F\u06CC\u06AF\u0631";
          }
        } else {
          displayText = `${toPersianDigits(diffDays)} \u0631\u0648\u0632 \u062F\u06CC\u06AF\u0631`;
        }
      } else {
        if (Math.abs(diffDays) > 7) {
          displayText = new Intl.DateTimeFormat("fa-IR", {
            calendar: "persian",
            day: "numeric",
            month: "long",
            year: "numeric"
          }).format(targetDate);
        } else if (Math.abs(diffDays) === 7) {
          displayText = `${toPersianDigits(7)} \u0631\u0648\u0632 \u06AF\u0630\u0634\u062A\u0647`;
        } else if (Math.abs(diffDays) >= 2) {
          displayText = `${toPersianDigits(Math.abs(diffDays))} \u0631\u0648\u0632 \u067E\u06CC\u0634`;
        } else if (isYesterday(currentDate, targetDate)) {
          displayText = "\u062F\u06CC\u0631\u0648\u0632";
        } else if (isSameDay(currentDate, targetDate)) {
          if (diffHours <= -12) {
            displayText = "\u0627\u0645\u0631\u0648\u0632";
          } else if (diffHours <= -1) {
            displayText = `${toPersianDigits(Math.abs(diffHours))} \u0633\u0627\u0639\u062A \u067E\u06CC\u0634`;
          } else if (diffMinutes <= -1) {
            displayText = `${toPersianDigits(Math.abs(diffMinutes))} \u062F\u0642\u06CC\u0642\u0647 \u067E\u06CC\u0634`;
          } else {
            displayText = "\u0686\u0646\u062F \u0644\u062D\u0638\u0647 \u067E\u06CC\u0634";
          }
        } else {
          displayText = `${toPersianDigits(Math.abs(diffDays))} \u0631\u0648\u0632 \u067E\u06CC\u0634`;
        }
      }
      return displayText;
    },
    [now]
  );
  return { toRelativeTime };
}
function useTypingLanguageFa() {
  const [isPersianText, setIsPersianText] = useState(false);
  const checkLanguage = (value) => {
    setIsPersianText(/[\u0600-\u06FF]/.test(value));
  };
  return { isPersianText, checkLanguage };
}

export { isValidCompanyId, useBankCardValidator, useMobileValidator, useNationalIdValidator, useNumberToWordsFa, usePaginationLabelsFa, usePersianDate, usePersianTextNormalizer, useRelativeTimeFa, useTypingLanguageFa };
