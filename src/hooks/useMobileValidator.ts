export function useMobileValidator() {
  const formatPhone = (phone: string): string => {
    return phone.replace(/[^\d]/g, "").replace(/^(\+98|0098|98)/, "0");
  };

  const isValidPhone = (phone: string): boolean => {
    const p = formatPhone(phone);
    return /^09\d{9}$/.test(p);
  };

  return { isValidPhone, formatPhone };
}
