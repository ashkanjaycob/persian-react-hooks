export const isValidCompanyId = (code: string): boolean => {
  const normalized = code.replace(/\D/g, "");
  if (!/^\d{11}$/.test(normalized)) return false;

  const checkDigit = +normalized[10];
  const base = normalized.substring(0, 10);
  const prefix = +normalized[9] + 2;

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += ((+base[i] + prefix) * (11 - i)) % 11;
  }

  const remainder = sum % 11;
  const control = remainder < 2 ? remainder : 11 - remainder;

  return control === checkDigit;
};
