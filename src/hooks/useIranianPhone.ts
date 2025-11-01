export function useIranianPhone() {
    const normalizePhone = (phone: string): string => {
      return phone
        .replace(/[^\d]/g, "")
        .replace(/^(\+98|0098|98)/, "0");
    };
  
    const isValidPhone = (phone: string): boolean => {
      const p = normalizePhone(phone);
      return /^09\d{9}$/.test(p);
    };
  
    return { normalizePhone, isValidPhone };
  }
  