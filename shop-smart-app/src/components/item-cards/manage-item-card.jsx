import "./item-cards.css";


export const ManageItemCard = ({ item }) => {
    console.log(item);
    return (
        <div id={item.idItem} className="item-card">
            <p className="item-name">{item.Name}</p>
            <button className="manage-item-button">{`>`}</button>
        </div>
    )
}