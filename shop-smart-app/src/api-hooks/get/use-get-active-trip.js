import { useEffect, useCallback } from "react";
import { useApi } from "../use-api-hook/use-api";

export function useGetActiveTrip() {
    const { data, error, loading, request } = useApi();

    const refetch = useCallback(() => {
        return request("/trips/active");
    }, [request]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, error, loading, refetch };
}