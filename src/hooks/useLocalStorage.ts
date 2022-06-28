import { useState } from "react";

function useLocalStorage<T>(
  name: string,
  initalValue: T
): [storageValue: T, setValue: (value: T) => void] {
  const [storageValue, setStorageValue] = useState<T>(() => {
    let value = localStorage.getItem(name);
    let data: T = value !== null ? JSON.parse(value) : initalValue;
    return data;
  });
  const setValue = (value: T): void => {
    setStorageValue(value);
    localStorage.setItem(name, JSON.stringify(value));
  };
  return [storageValue, setValue];
}
export { useLocalStorage };
