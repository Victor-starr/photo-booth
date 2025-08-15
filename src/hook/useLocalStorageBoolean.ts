import { useState, useEffect } from "react";

export default function useLocalStorageBoolean(
  key: string,
  defaultValue: boolean
) {
  const [value, setValue] = useState<boolean | null>(null);
  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored === "true") setValue(true);
    else if (stored === "false") setValue(false);
    else setValue(defaultValue);
  }, [key, defaultValue]);
  const setAndStore = (val: boolean) => {
    setValue(val);
    window.localStorage.setItem(key, val ? "true" : "false");
  };
  return [value, setAndStore] as const;
}
