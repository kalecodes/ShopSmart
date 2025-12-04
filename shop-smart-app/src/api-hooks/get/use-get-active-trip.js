import { useEffect, useCallback } from "react";
import { useApi } from "../use-api-hook/use-api";

export function useGetActiveTrip() {
    const { data, error, loading, request } = useApi();
    const user_id = localStorage.getItem("userId");

    const refetch = useCallback(() => {
        if (!user_id) return;
        return request(`/trips/active/${user_id}`);
    }, [request]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, error, loading, refetch };
}