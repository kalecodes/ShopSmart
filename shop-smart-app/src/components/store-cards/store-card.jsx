



export const StoreCard = ({ store, itemCards }) => {

    return (
        <div id={store.id}>
            <h2>{store.name}</h2>
            <div>
                {itemCards}
            </div>
        </div>
    )
}