import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(
        async (url: string, method = "GET", body: any = null, headers: Record<string, string> = { "Content-Type": "application/json" }) => {
            setLoading(true);

            try {
                const res = await fetch(url, { method, body, headers });

                if (!res.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
                }

                const data = await res.json(); // Добавил await, иначе возвращается Promise

                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);

                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An unknown error occurred");
                }

                throw e;
            }
        },
        []
    );

    const clearError = useCallback(() => setError(null), []);

    return { loading, error, request, clearError };
};
