export const useNationalIdValidator = (code: string): boolean => {
  const normalized = code.replace(/\D/g, "");

  if (!/^\d{10}$/.test(normalized)) return false;
  if (/^(\d)\1{9}$/.test(normalized)) return false;

  const digits = [...normalized].map(Number);
  const check = digits.pop()!;
  const sum = digits.reduce((acc, d, i) => acc + d * (10 - i), 0);
  const remainder = sum % 11;

  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  );
};
