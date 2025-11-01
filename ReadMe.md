
# Persian React Hooks


Lightweight TypeScript-ready collection of React hooks for Persian (Farsi) language utilities — numbers, dates, validation, and text normalization.


## 🚀 Installation

## NPM

```bash
  npm install persian-react-hooks
```

## PNPM

```bash
  pnpm add persian-react-hooks
```

## YARN

```bash
  yarn add persian-react-hooks
```


## How To Use / Example 

Lightweight TypeScript-ready collection of React hooks for Persian (Farsi) language utilities — numbers, dates, validation, and text normalization.

```javascript
import usePersianDigits from "persian-react-hooks

function App() {

  const { toPersianDigits } = usePersianDigits();

  return
      <>
            <h3>persian-react-hooks examples</h3>

            <p>🔢 Persian Digits: {toPersianDigits(12034)}</p>

            // This Hook Turns Digits to Persian(fa) Digits .

      </>
}
```


``` 
All Hooks You Can Use Based On Names : 

  usePersianDigits,
  useEnglishDigits,
  usePersianDate,
  useTimeAgoFa,
  useNumberToWordsFa,
  useIranianNationalId,
  useIranianPhone,
  useBankCardValidator,
  useTextDirection,
  useNormalizePersianText,
  usePersianKeyboard,
  usePersianPaginationLabels,



