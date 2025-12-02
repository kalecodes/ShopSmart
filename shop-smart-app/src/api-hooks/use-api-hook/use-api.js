import { useState, useCallback } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export function useApi(baseUrl = API_URL) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (endpoint, { method = "GET", body = null, headers = {} } = {}) => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(baseUrl + endpoint, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        ...headers
                    },
                    body: body ? JSON.stringify(body) : null
                });

                if (!res.ok) {
                    throw new Error(`HTTP Error - ${res.status}: ${res.statusText}`)
                }

                const json = await res.json();
                setData(json);
                return json;
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }, [baseUrl]
    )

    return { data, error, loading, request };
}