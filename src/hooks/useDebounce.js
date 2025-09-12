import { useEffect, useState } from 'react';

/**
 * useDebounce
 * Delays updating a value until after a timeout period has passed.
 *
 * @param value - The value to debounce (usually from user input)
 * @param delay - How long to wait before updating (in ms)
 */

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}