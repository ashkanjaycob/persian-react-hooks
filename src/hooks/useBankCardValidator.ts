import { useCallback } from "react";

type BankInfo = { id: string; fa: string; en: string; bin: string };

const BIN6_TO_BANK: Record<string, BankInfo> = {
  "603799": {
    id: "melli",
    fa: "بانک ملی ایران",
    en: "Bank Melli Iran",
    bin: "603799",
  },
  "589210": { id: "sepah", fa: "بانک سپه", en: "Bank Sepah", bin: "589210" },
  "603769": {
    id: "saderat",
    fa: "بانک صادرات ایران",
    en: "Bank Saderat Iran",
    bin: "603769",
  },
  "610433": { id: "mellat", fa: "بانک ملت", en: "Bank Mellat", bin: "610433" },
  "627353": {
    id: "tejarat",
    fa: "بانک تجارت",
    en: "Bank Tejarat",
    bin: "627353",
  },
  "585983": {
    id: "tejarat",
    fa: "بانک تجارت",
    en: "Bank Tejarat",
    bin: "585983",
  },
  "603770": {
    id: "keshavarzi",
    fa: "بانک کشاورزی",
    en: "Agricultural Bank",
    bin: "603770",
  },
  "628023": { id: "maskan", fa: "بانک مسکن", en: "Bank Maskan", bin: "628023" },
  "627760": {
    id: "postbank",
    fa: "پست بانک ایران",
    en: "Post Bank Iran",
    bin: "627760",
  },
  "502908": {
    id: "tosee-taavon",
    fa: "بانک توسعه تعاون",
    en: "Bank Tose'e Ta'avon",
    bin: "502908",
  },
  "627412": {
    id: "en",
    fa: "بانک اقتصاد نوین",
    en: "Eghtesad Novin Bank",
    bin: "627412",
  },
  "622106": {
    id: "parsian",
    fa: "بانک پارسیان",
    en: "Parsian Bank",
    bin: "622106",
  },
  "502229": {
    id: "pasargad",
    fa: "بانک پاسارگاد",
    en: "Bank Pasargad",
    bin: "502229",
  },
  "627488": {
    id: "karafarin",
    fa: "بانک کارآفرین",
    en: "Karafarin Bank",
    bin: "627488",
  },
  "621986": { id: "saman", fa: "بانک سامان", en: "Saman Bank", bin: "621986" },
  "639346": { id: "sina", fa: "بانک سینا", en: "Sina Bank", bin: "639346" },
  "639607": {
    id: "sarmayeh",
    fa: "بانک سرمایه",
    en: "Sarmayeh Bank",
    bin: "639607",
  },
  "504706": { id: "shahr", fa: "بانک شهر", en: "Bank Shahr", bin: "504706" },
  "502806": { id: "shahr", fa: "بانک شهر", en: "Bank Shahr", bin: "502806" },
  "502938": { id: "day", fa: "بانک دی", en: "Day Bank", bin: "502938" },
  "627648": {
    id: "edbi",
    fa: "بانک توسعه صادرات ایران",
    en: "Export Development Bank",
    bin: "627648",
  },
  "627961": {
    id: "imib",
    fa: "بانک صنعت و معدن",
    en: "Bank of Industry & Mine",
    bin: "627961",
  },
  "589463": {
    id: "refah",
    fa: "بانک رفاه کارگران",
    en: "Refah Bank",
    bin: "589463",
  },
  "627381": {
    id: "ansar-sepah",
    fa: "بانک انصار",
    en: "Ansar",
    bin: "627381",
  },
  "606373": {
    id: "mehr",
    fa: "قرض‌الحسنه مهر ایران",
    en: "Gharz-al-Hasaneh Mehr Iran",
    bin: "606373",
  },
  "606256": {
    id: "melal",
    fa: "مؤسسه اعتباری ملل",
    en: "Melal Credit Institution",
    bin: "606256",
  },
  "639599": {
    id: "ghavamin-sepah",
    fa: "قوامین",
    en: "Ghavamin",
    bin: "639599",
  },
};

const faDigits = "۰۱۲۳۴۵۶۷۸۹";
const normalizeDigits = (input: string | number) =>
  String(input)
    .replace(/[۰-۹]/g, (d) => String(faDigits.indexOf(d)))
    .replace(/\D/g, "");

const luhnCheck = (digits: string) => {
  let sum = 0;
  let doubleIt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48; // '0' charCode = 48
    if (doubleIt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    doubleIt = !doubleIt;
  }
  return sum % 10 === 0;
};

export function useBankCardValidator() {
  const formatCard = useCallback((card: string): string => {
    const digits = normalizeDigits(card).slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }, []);

  const isValidCard = useCallback((card: string): boolean => {
    const digits = normalizeDigits(card);
    if (digits.length !== 16) return false;
    if (/^(\d)\1{15}$/.test(digits)) return false;
    return luhnCheck(digits);
  }, []);

  const getBankByCard = useCallback(
    (card: string | number): BankInfo | null => {
      const digits = normalizeDigits(card);
      if (digits.length < 6) return null;
      return BIN6_TO_BANK[digits.slice(0, 6)] ?? null;
    },
    []
  );

  return { isValidCard, formatCard, getBankByCard };
}
