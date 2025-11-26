import "./item-cards.css";

export const ShopItemCard = (item) => {
    return (
        <div id={item.id} className=".item-card"> 
            <p className="item-name">{item.name}</p>
            <button className="check-item-button">{`O`}</button>
        </div>
    )
}