import "./HomePage.css";
import { ItemSearchInput } from "../components/custom-inputs/item-search";
import { UnassignedCard } from "../components/store-cards/unassigned-card";
import { StoreCard } from "../components/store-cards/store-card";
import { ManageItemCard } from "../components/item-cards/manage-item-card";

export default function HomePage() {
  const unassignedItems = [{ id: 11, name: 'milk' }, { id: 22, name: 'eggs' }, { id: 33, name: 'bacon' }];
  const unassignnedItemCards = unassignedItems.map(u => ManageItemCard(u));
  const stores = [{ id: 1, name: 'Target', items: unassignedItems }, { id: 2, name: 'Walmart', items: unassignedItems }];
  const storeCards = stores.map(s => {
    const itemCards = s.items.map(i => ManageItemCard(i));
    return StoreCard({ store: s, itemCards });
  });

  return (
    <div className="home-page">
      <div>
        <ItemSearchInput/>
        <UnassignedCard itemCards={unassignnedItemCards} />
      </div>
      <div>
        {storeCards}
        <button>{`+`}</button>
      </div>
    </div>
  );
}
