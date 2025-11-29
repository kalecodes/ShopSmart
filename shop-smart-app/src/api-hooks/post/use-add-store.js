import { useApi } from "../use-api-hook/use-api";

export function useAddStore() {
    const api = useApi();

    async function addStore(name) {
        return api.request("/store", {
            method: "POST",
            body: { name },
        });
    };

    return {
        ...api,
        addStore,
    }
}