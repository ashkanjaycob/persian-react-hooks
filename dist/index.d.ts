declare function usePersianDigits(): {
    toPersianDigits: (value: string | number, options?: {
        comma?: boolean;
    }) => string;
};

declare function useEnglishDigits(): {
    toEnglishDigits: (input: string) => string;
};

declare function usePersianDate(): {
    toPersianDate: (date: string | Date, opts?: Intl.DateTimeFormatOptions) => string;
};

declare function useTimeAgoFa(date: string | Date, autoUpdate?: boolean): {
    toTimeAgo: (target: string | Date) => string;
};

declare function useNumberToWordsFa(): {
    toWords: (num: number) => string;
};

declare const validateIranianNationalId: (code: string) => boolean;

declare function useIranianPhone(): {
    normalizePhone: (phone: string) => string;
    isValidPhone: (phone: string) => boolean;
};

type BankInfo = {
    id: string;
    fa: string;
    en: string;
    bin: string;
};
declare function useBankCardValidator(): {
    isValidCard: (card: string) => boolean;
    formatCard: (card: string) => string;
    getBankByCard: (card: string | number) => BankInfo | null;
};

declare function useTextDirection(): {
    dir: (text: string) => "rtl" | "ltr";
};

declare function useNormalizePersianText(): {
    normalize: (text: string) => string;
};

declare function usePersianKeyboard(): {
    isPersianTyping: boolean;
    detectLanguage: (value: string) => void;
};

declare function usePersianPaginationLabels(): {
    labels: {
        next: string;
        prev: string;
        first: string;
        last: string;
        page: string;
        of: string;
        rowsPerPage: string;
        noData: string;
        loading: string;
    };
};

export { useBankCardValidator, useEnglishDigits, useIranianPhone, useNormalizePersianText, useNumberToWordsFa, usePersianDate, usePersianDigits, usePersianKeyboard, usePersianPaginationLabels, useTextDirection, useTimeAgoFa, validateIranianNationalId };
