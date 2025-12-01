import { useCallback, useEffect } from "react";
import { useApi } from "../use-api-hook/use-api";


export function useGetTripItems(trip_id) {
    const { data, error, loading, request } = useApi();

    const refetch = useCallback(() => {
        if (!trip_id) return;
        return request(`/trips/${trip_id}/items`);
    }, [request, trip_id]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, error, loading, refetch };
}