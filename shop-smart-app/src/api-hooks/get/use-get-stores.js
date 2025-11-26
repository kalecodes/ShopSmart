import { useCallback, useEffect } from "react";
import { useApi } from "../use-api-hook/use-api";


export function useGetStores() {
    const { data, error, loading, request } = useApi();

    const refetch = useCallback(() => {
        return request("/stores");
    }, [request]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, error, loading, refetch };
}