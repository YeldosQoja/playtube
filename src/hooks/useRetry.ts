"use client";

import { useCallback, useEffect, useRef } from "react";

export type RetryOptions = {
  /**
   * Total attempts, including the first try.
   * Example: retries=3 means "try up to 3 times" (1 initial + 2 retries).
   */
  retries?: number;
  /** Fixed delay between attempts (ms). Ignored if `getDelayMs` is provided. */
  delayMs?: number;
  /** Dynamic delay between attempts (ms). Receives the failed attempt number. */
  getDelayMs?: (attempt: number, error: unknown) => number;
  /**
   * Decide whether to retry a failure.
   * `attempt` is the failed attempt number (1-based).
   */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export function useRetry<T>(
  request: Promise<T>,
  options?: RetryOptions
): () => Promise<T>;
export function useRetry<T, Args extends unknown[]>(
  request: (...args: Args) => Promise<T>,
  options?: RetryOptions
): (...args: Args) => Promise<T>;
export function useRetry<T, Args extends unknown[]>(
  request: Promise<T> | ((...args: Args) => Promise<T>),
  options: RetryOptions = {}
) {
  const cancelledRef = useRef(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const runWithRetry = useCallback(
    async (...args: Args) => {
      const getOpts = () => optionsRef.current ?? {};
      const retries = getOpts().retries ?? 3;

      let attempt = 0;
      // Note: if `request` is a Promise (not a function), retrying can't re-run it.
      // Prefer passing a function that *creates* the promise for true retries.
      while (attempt < retries) {
        attempt += 1;
        try {
          if (typeof request === "function") {
            return await request(...args);
          } else {
            return await request;
          }
        } catch (error) {
          if (cancelledRef.current) throw error;

          const opts = getOpts();
          const shouldRetry =
            attempt < retries &&
            (opts.shouldRetry ? opts.shouldRetry(error, attempt) : true);

          if (!shouldRetry) throw error;

          const delayMs =
            opts.getDelayMs?.(attempt, error) ?? opts.delayMs ?? 0;
          if (delayMs > 0) await sleep(delayMs);
        }
      }

      // Should be unreachable due to loop/throws, but keeps TypeScript happy.
      throw new Error("Retry attempts exhausted");
    },
    [request]
  );

  return runWithRetry;
}
