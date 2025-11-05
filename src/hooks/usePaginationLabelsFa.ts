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

export function usePaginationLabelsFa() {
  const labels: PaginationLabels = {
    next: "بعدی",
    prev: "قبلی",
    first: "اولین",
    last: "آخرین",
    page: "صفحه",
    of: "از",
    rowsPerPage: "تعداد در صفحه",
    noData: "داده‌ای یافت نشد",
    loading: "در حال بارگذاری...",
  };

  return { labels };
}
