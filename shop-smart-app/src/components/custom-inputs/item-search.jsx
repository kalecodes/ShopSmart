import { useState } from "react";
import "./item-search.css"
import { useAddItem } from "../../api-hooks/post/use-add-item";

export const ItemSearchInput = ({ refetchItems }) => {
    const [text, setText] = useState("");
    const { addItem, loading, error } = useAddItem();

    async function handleAdd() {
        if (!text.trim()) return;

        try {
            await addItem(text);
            setText("");
            refetchItems();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="add-item">
            <input 
                type="text" 
                id="item-input" 
                className="item-name-input" 
                placeholder="Add an Item..."
                value={text}
                onChange={(e) => setText(e.target.value)}/>
            <button onClick={(e) => handleAdd(e)}>Add</button>
        </div>
    )
}