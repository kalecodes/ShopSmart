import "./store-card"
import { ItemSearchInput } from "../custom-inputs/item-search"



export const UnassignedCard = ({ itemCards, refetchItems, isShop }) => {
    return (
        <div className={isShop ? "store-card" : "unassigned-card"}>
            {!isShop && <ItemSearchInput refetchItems={refetchItems} />}
            {itemCards.length > 0 && (
                <>
                    <h2 className="store-name">Unassigned</h2>
                    <div>
                        {itemCards}
                    </div>
                </>
            )}
            
        </div>
    )
}