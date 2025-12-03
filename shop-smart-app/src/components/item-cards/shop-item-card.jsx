import { useUpdateItem } from "../../api-hooks/patch/use-update-item";
import { ItemStatus } from "../../utils/types";
import "./item-cards.css";

export const ShopItemCard = ({ item, refetchItems }) => {
    const { updateItem } = useUpdateItem();
    
    async function toggleItemStatus() {
        const newStatus = item.Status === ItemStatus.Active ? ItemStatus.Checked : ItemStatus.Active;
        try {
            await updateItem(item.idItem, item.StoreID, newStatus);
            await refetchItems();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div id={item.idItem} className="item-card"> 
            <p className="item-name">{item.Name}</p>
            <button 
                className="check-item-button" 
                style={{ backgroundColor: item.Status === ItemStatus.Checked ? '#3e67d6' : 'white' }} 
                onClick={toggleItemStatus}
            />
        </div>
    )
}