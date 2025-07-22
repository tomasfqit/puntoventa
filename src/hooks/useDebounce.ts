import { useCallback, useEffect, useRef } from "react";

type Procedure = (...args: string[]) => void;

interface DebouncedFunction<F extends Procedure> {
  (...args: Parameters<F>): void;
  cancel: () => void;
}

export function useDebounce<F extends Procedure>(
  func: F,
  wait: number,
  immediate = false
): DebouncedFunction<F> {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: Parameters<F>) => {
      const later = () => {
        timeout.current = null;
        if (!immediate) {
          func(...args);
        }
      };

      const callNow = immediate && timeout.current === null;

      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(later, wait);

      if (callNow) {
        func(...args);
      }
    },
    [func, wait, immediate]
  );

  // cancelar al desmontar
  useEffect(() => {
    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  // añadimos método para cancelar manualmente
  (debounced as DebouncedFunction<F>).cancel = () => {
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  return debounced as DebouncedFunction<F>;
}
