import "./store-card.css";

export const StoreCard = ({ store, itemCards }) => {

    return (
        <div id={store.id} className="store-card">
            <h2 className="store-name">{store.name}</h2>
            <div className="store-items-wrapper">
                {itemCards}
            </div>
        </div>
    )
}