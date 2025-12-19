import { useState, useEffect } from "react";

/**
 * Hook to simulate initial loading state for better perceived performance
 * @param delay - Time in ms before content is shown (default: 300ms)
 * @returns isLoading state
 */
export const useLoadingState = (delay: number = 300): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
};
