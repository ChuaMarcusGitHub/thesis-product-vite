/* eslint-disable no-unused-vars */
const DEBOUNCE_DELAY = 200; // miliseconds
import { useRef, useCallback } from "react";

/**
 * Using windows.set/clearTimeout due to some typing issues of being unable to defined the NodeJS.Timeout module
 * usageSample:
 *
 * const onChange = (...args) => {...}
 * const onDebouncedListener = useDebounceHook((...args) => onListener(args), 500)
 * <Component onChange={(event) => onDebouncedListener(event)} />
 * or
 * <Component onChange={() => useDebounceHook(() => {...}, 500)}
 * -------------------------
 * Note that debounce returns a function wrapped in debounce,
 * It does not delay the call (use setTimeout for this)!
 *
 * @param callback - method to callback when the delay is over
 * @param delay - time in miliseconds (ms) before the callback is executed
 * @returns - useCallback hook that triggers the argument's methods call
 */
export const useDebounceHook = (
  callback: (...args: unknown[]) => void,
  delay = DEBOUNCE_DELAY,
) => {
  const timeout = useRef<number>(0);

  return useCallback(
    (...args: unknown[]) => {
      const later = () => {
        window.clearTimeout(timeout.current);
        callback(...args);
      };

      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(later, delay);
    },
    [callback, delay],
  );
};
