import { useEffect, useCallback } from "react";
import { useApi } from "../use-api-hook/use-api";

export function useGetItems() {
    const { data, error, loading, request } = useApi();

    const refetch = useCallback(() => {
        return request("/all-items");
    }, [request]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, error, loading, refetch };
}