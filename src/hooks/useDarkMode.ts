import { useEffect, useState } from "react";

export const useDarkMode = (key: any) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    currentValue = JSON.parse(localStorage.getItem(key) || "[]");
    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
