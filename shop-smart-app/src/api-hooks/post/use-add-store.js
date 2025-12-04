import { useApi } from "../use-api-hook/use-api";

export function useAddStore() {
    const api = useApi();
    const user_id = localStorage.getItem("userId");

    async function addStore(name) {
        return api.request("/store", {
            method: "POST",
            body: { name, user_id },
        });
    };

    return {
        ...api,
        addStore,
    }
}