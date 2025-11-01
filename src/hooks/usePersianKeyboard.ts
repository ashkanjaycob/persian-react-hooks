import { useState } from "react";

export function usePersianKeyboard() {
  const [isPersianTyping, setIsPersianTyping] = useState(false);

  const detectLanguage = (value: string) => {
    setIsPersianTyping(/[\u0600-\u06FF]/.test(value));
  };

  return { isPersianTyping, detectLanguage };
}
