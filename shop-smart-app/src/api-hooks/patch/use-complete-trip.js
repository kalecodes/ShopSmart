import { useApi } from "../use-api-hook/use-api";

export function useCompleteTrip() {
    const api = useApi();

    async function completeTrip(trip_id) {
        return api.request(`/trips/${trip_id}/complete`, {
            method: "PATCH",
        });
    };

    return {
        ...api,
        completeTrip,
    }
}