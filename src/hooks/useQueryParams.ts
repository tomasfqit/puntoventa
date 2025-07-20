// hooks/useQueryParams.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const getAllParams = (): Record<string, string> => {
    const entries = Array.from(searchParams.entries());
    return Object.fromEntries(entries);
  };

  const setParams = (
    params: Record<string, string | number | undefined | null>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
    });

    router.push(`?${newSearchParams.toString()}`);
  };

  const clearParams = () => {
    router.push("?");
  };

  return {
    getParam,
    getAllParams,
    setParams,
    clearParams,
  };
};
