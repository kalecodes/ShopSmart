import { useApi } from "../use-api-hook/use-api";

export function useAddItem() {
    const api = useApi();
    const user_id = localStorage.getItem("userId");

    async function addItem(name) {
        if (!user_id) return;
        return api.request("/item", {
            method: "POST",
            body: { name, user_id },
        });
    };

    return {
        ...api,
        addItem,
    }
}