import { useApi } from "../use-api-hook/use-api";

export function useUpdateItem() {
    const api = useApi();

    async function updateItem(id, storeId, status) {
        return api.request("/update-item", {
            method: "PATCH",
            body: { id, storeId, status }
        });
    };

    return {
        ...api,
        updateItem,
    }
}