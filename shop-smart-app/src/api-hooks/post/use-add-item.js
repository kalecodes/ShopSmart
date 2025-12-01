import { useApi } from "../use-api-hook/use-api";

export function useAddItem() {
    const api = useApi();

    async function addItem(name) {
        return api.request("/item", {
            method: "POST",
            body: { name },
        });
    };

    return {
        ...api,
        addItem,
    }
}