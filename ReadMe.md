# 🇮🇷 Persian React Hooks

Lightweight TypeScript-ready collection of React hooks for Persian (Farsi) language utilities — numbers, dates, validation, and text normalization.


🚀 Installation
# with npm
npm install persian-react-hooks

# or pnpm
pnpm add persian-react-hooks

# or yarn
yarn add persian-react-hooks

🧩 Available Hooks
🔢 1. usePersianDigits

Convert English digits to Persian with optional comma formatting.

import { usePersianDigits } from "persian-react-hooks";

const { toPersianDigits } = usePersianDigits();
toPersianDigits(12034); // "۱۲٬۰۳۴"

🔣 2. useEnglishDigits

Convert Persian digits back to English.

const { toEnglishDigits } = useEnglishDigits();
toEnglishDigits("۱۲۳۴۵"); // "12345"

🗓 3. usePersianDate

Convert Gregorian date (string or Date) to Shamsi (Jalali).

const { toPersianDate } = usePersianDate();
toPersianDate("2025-11-01"); // "۱۰ آبان ۱۴۰۴"

🕰 4. useTimeAgoFa

Show relative Persian time like “۳ ساعت پیش” or “۲ روز دیگر”.

const { toTimeAgo } = useTimeAgoFa();
toTimeAgo("2025-10-31T23:10:00Z"); // "۲ ساعت پیش"

🔠 5. useNumberToWordsFa

Convert number to Persian words.

const { toWords } = useNumberToWordsFa();
toWords(1234); // "یک هزار و دویست و سی و چهار"

🪪 6. useIranianNationalId

Validate Iranian National ID.

const { isValid } = useIranianNationalId("0499370899"); // true

📱 7. useIranianPhone

Normalize and validate Iranian mobile numbers.

const { normalizePhone, isValidPhone } = useIranianPhone();
normalizePhone("۰۹۱۲۱۲۳۴۵۶۷"); // "09121234567"

💳 8. useBankCardValidator

Validate and format Iranian bank card numbers.

const { formatCard, isValidCard } = useBankCardValidator();
formatCard("6037991234567890"); // "6037 9912 3456 7890"

✍️ 9. useTextDirection

Auto-detect text direction (RTL/LTR).

const { dir } = useTextDirection("سلام دنیا"); // "rtl"

🧩 10. useNormalizePersianText

Normalize Persian text by converting Arabic characters.

const { normalize } = useNormalizePersianText();
normalize("علي"); // "علی"

⌨️ 11. usePersianKeyboard

Detect if user is typing in Persian.

const { isPersianTyping } = usePersianKeyboard();

🗃 12. usePersianPaginationLabels

Localized pagination labels for UI tables.

const { labels } = usePersianPaginationLabels();
labels.next; // "بعدی"
labels.prev; // "قبلی"

🧱 Tech Stack

⚛️ React 18+ compatible

🧩 Written in TypeScript

⚡️ Bundled with tsup

💡 Zero dependencies

🧪 Example (Next.js / Vite)
import { usePersianDigits, useTimeAgoFa } from "persian-react-hooks";

export default function Example() {
  const { toPersianDigits } = usePersianDigits();
  const { toTimeAgo } = useTimeAgoFa();

  return (
    <div>
      <p>تعداد بازدید: {toPersianDigits(12034)}</p>
      <p>آخرین به‌روزرسانی: {toTimeAgo("2025-10-31T23:10:00Z")}</p>
    </div>
  );
}

🧑‍💻 Contributing

Contributions are welcome!
If you want to add more Persian utility hooks:

Fork the repo

Create a feature branch

Submit a pull request
