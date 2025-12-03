import { forwardRef } from "react";
import "./item-action-menu.css";
import { useDeleteItem } from "../../api-hooks/post/use-delete-item";
import { useUpdateItem } from "../../api-hooks/patch/use-update-item";
import { ItemStatus } from "../../utils/types";


export const ActionMenu = forwardRef(
    ({ open, anchorEl, item, onClose, stores, refetchItems }, ref) => {
        if (!open || !anchorEl) return null;
        const { deleteItem } = useDeleteItem();
        const { updateItem } = useUpdateItem();

        const el = anchorEl.getBoundingClientRect();
        const top = el.top + window.scrollY;
        const left = el.right + window.scrollX;

        async function handleDelete(id) {
            try {
                await deleteItem(id)
                await refetchItems();
                onClose();
            } catch (e) {
                console.error(e);
            }
        }

        async function handleAssign(item, store_id) {
            try {
                await updateItem(item.idItem, store_id, item.Status);
                await refetchItems();
                onClose();
            } catch (e) {
                console.error(e);
            }
        }

        async function handleComplete(item) {
            try {
                await updateItem(item.idItem, item.StoreID, ItemStatus.Inactive);
                await refetchItems();
                onClose();
            } catch (e) {
                console.error(e);
            }
        }

        return (
            <div 
                ref={ref}
                className="action-menu"
                style={{ position: "absolute", top, left }}
            >
                {item.storeID === null && <button className="action" onClick={() => handleAssign(item, null)}>Unassign</button>}
                {stores.filter(s => s.idStore !== item.StoreID).map((s) => {
                     return (<button key={`move-to-${s.idStore}-button`} className="action" onClick={() => handleAssign(item, s.idStore)}>Assign to {s.Name}</button>)
                })}
                <button className="action" onClick={() => handleComplete(item)}>Mark Complete</button>
                <button className="action" onClick={() => handleDelete(item.idItem)}>Delete Permanently</button>
            </div>
        )
    }
)