import "./trip-picker-card.css";
import { useAddTrip } from "../../api-hooks/post/use-add-trip";

export const TripPickerCard = ({ label, items, refetchDash }) => {
    const { addTrip, loading, error } = useAddTrip(); 

    async function handleStartTrip() {
        try {
            await addTrip(items);
            await refetchDash();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div key={label} className="trip-picker-card">
            <p className="trip-picker-label">{label}</p>
            <p className="items-count">{items.length} {items.length > 1 ? "Items" : "Item"}</p>
            <button className="select-trip-button" onClick={handleStartTrip}>{`>`}</button>
        </div>
    )
}