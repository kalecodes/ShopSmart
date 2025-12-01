import { useApi } from "../use-api-hook/use-api";

export function useAddTrip() {
    const api = useApi();

    async function addTrip(item_ids) {
        return api.request("/trips/new", {
            method: "POST",
            body: { item_ids },
        });
    };

    return {
        ...api,
        addTrip,
    }
}