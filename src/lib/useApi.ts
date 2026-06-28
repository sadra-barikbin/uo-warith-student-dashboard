"use client";

import { useEffect, useState } from "react";

interface ApiState<T> {
  url: string;
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ url, data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json() as Promise<T>;
      })
      .then((data) => {
        if (!cancelled) setState({ url, data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ url, data: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (state.url !== url) {
    return { url, data: null, loading: true, error: null };
  }
  return state;
}
