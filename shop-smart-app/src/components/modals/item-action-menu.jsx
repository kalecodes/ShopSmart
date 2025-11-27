import { forwardRef } from "react";
import "./item-action-menu.css";
import { useDeleteItem } from "../../api-hooks/post/use-delete-item";
import { useUpdateItem } from "../../api-hooks/patch/use-update-item";


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
            console.log(item.idItem, item.Status, store_id);
            try {
                await updateItem(item.idItem, item.Status, store_id);
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
                <button className="action" onClick={() => handleAssign(item, null)}>Unassign</button>
                {stores.map((s) => {
                     return (<button key={`move-to-${s.idStore}-button`} className="action" onClick={() => handleAssign(item, s.idStore)}>Assign to {s.Name}</button>)
                })}
                <button className="action" onClick={() => console.log("remove")}>Mark Commplete</button>
                <button className="action" onClick={() => handleDelete(item.idItem)}>Delete Permanently</button>
            </div>
        )
    }
)