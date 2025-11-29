import { useApi } from "../use-api-hook/use-api";

export function useDeleteItem() {
    const api = useApi();

    async function deleteItem(id) {
        return api.request(`/items/${id}`, {
            method: "DELETE",
        });
    };

    return {
        ...api,
        deleteItem,
    }
}