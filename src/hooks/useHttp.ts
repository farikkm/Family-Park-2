import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers: Record<string, string> = {}
    ) => {
      setLoading(true);
      setError(null);

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }

      try {
        const res = await fetch(`${apiBaseUrl}${url}`, options);
        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }

        if (!res.ok) {
          throw new Error(
            data?.message || `Ошибка ${res.status}: ${res.statusText}`
          );
        }

        return data;
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Произошла неизвестная ошибка");
        }

        throw e;
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl] // Добавил в зависимости, чтобы избежать возможных багов
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
