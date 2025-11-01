export function useIranianNationalId() {
  const isValid = (input: string): boolean => {
    const code = input.replace(/[^0-9]/g, "");
    if (!/^\d{10}$/.test(code)) return false;
    const check = +code[9];
    const sum =
      code
        .split("")
        .slice(0, 9)
        .reduce((s, d, i) => s + +d * (10 - i), 0) % 11;
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
  };
  return { isValid };
}
