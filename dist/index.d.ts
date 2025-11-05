type BankInfo = {
    id: string;
    fa: string;
    en: string;
    bin: string;
};
declare function useBankCardValidator(): {
    isValidBankCard: (card: string) => boolean;
    formatBankCard: (card: string) => string;
    getBankInfo: (card: string | number) => BankInfo | null;
};

declare const isValidCompanyId: (code: string) => boolean;

declare function useMobileValidator(): {
    isValidPhone: (phone: string) => boolean;
    formatPhone: (phone: string) => string;
};

declare const isValidNationalId: (code: string) => boolean;

declare function useNumberToWordsFa(): {
    numberToWordsFa: (num: number) => string;
};

type PaginationLabels = {
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
declare function usePaginationLabelsFa(): {
    labels: PaginationLabels;
};

declare function usePersianDate(): {
    toDateFa: (date: string | Date, opts?: Intl.DateTimeFormatOptions) => string;
};

declare const usePersianTextNormalizer: (text: string) => string;

declare function useRelativeTimeFa(autoUpdate?: boolean): {
    toRelativeTime: (input: string | Date) => string;
};

declare function useTypingLanguageFa(): {
    isPersianText: boolean;
    checkLanguage: (value: string) => void;
};

export { isValidCompanyId, isValidNationalId, useBankCardValidator, useMobileValidator, useNumberToWordsFa, usePaginationLabelsFa, usePersianDate, usePersianTextNormalizer, useRelativeTimeFa, useTypingLanguageFa };
