export function useBankCardValidator() {
  const formatCard = (card: string): string =>
    card
      .replace(/\s+/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const isValidCard = (card: string): boolean => {
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
