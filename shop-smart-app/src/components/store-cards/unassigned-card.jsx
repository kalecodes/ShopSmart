import "./store-card"
import { ItemSearchInput } from "../custom-inputs/item-search"



export const UnassignedCard = ({ itemCards, refetchItems, isShop }) => {
    return (
        <div className={"unassigned-card"}>
            {!isShop && <ItemSearchInput refetchItems={refetchItems} />}
            {itemCards.length > 0 && (
                <>
                    <h2 className="store-name">Unassigned</h2>
                    <div className="unassigned-item-cards">
                        {itemCards}
                    </div>
                </>
            )}
            
        </div>
    )
}