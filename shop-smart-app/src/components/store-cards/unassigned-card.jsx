import "./store-card"
import { ItemSearchInput } from "../custom-inputs/item-search"



export const UnassignedCard = ({ itemCards, refetchItems }) => {
    return (
        <div className="unassigned-card">
            <ItemSearchInput refetchItems={refetchItems} />
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