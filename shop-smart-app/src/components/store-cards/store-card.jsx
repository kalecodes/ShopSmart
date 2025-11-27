import "./store-card.css";

export const StoreCard = ({ store, itemCards }) => {

    return (
        <div id={store.idStore} className="store-card">
            <h2 className="store-name">{store.Name}</h2>
            <div className="store-items-wrapper">
                {itemCards}
            </div>
        </div>
    )
}