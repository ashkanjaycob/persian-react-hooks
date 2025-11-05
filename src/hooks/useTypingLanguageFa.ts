import { useState } from "react";

export function useTypingLanguageFa() {
  const [isPersianText, setIsPersianText] = useState(false);

  const checkLanguage = (value: string) => {
    setIsPersianText(/[\u0600-\u06FF]/.test(value));
  };

  return { isPersianText, checkLanguage };
}
