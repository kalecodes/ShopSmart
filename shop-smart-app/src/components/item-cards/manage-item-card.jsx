import "./item-cards.css";


export const ManageItemCard = ({ item, onOpenMenu }) => {
    return (
        <div key={item.idItem} id={item.idItem} className="item-card">
            <p className="item-name">{item.Name}</p>
            <button className="manage-item-button" onClick={(e) => onOpenMenu(item, e.currentTarget)}>{`>`}</button>
        </div>
    )
}