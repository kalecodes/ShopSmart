import { useApi } from "../use-api-hook/use-api";

export function useAddTrip() {
    const api = useApi();
    const user_id = localStorage.getItem("userId");

    async function addTrip(item_ids) {
        if (!user_id) return;
        return api.request("/trips/new", {
            method: "POST",
            body: { item_ids, user_id },
        });
    };

    return {
        ...api,
        addTrip,
    }
}