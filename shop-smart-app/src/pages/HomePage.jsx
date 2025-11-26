import "./HomePage.css";
import { useGetItems } from "../api-hooks/get/use-get-items";
import { useGetStores } from "../api-hooks/get/use-get-stores";
import { UnassignedCard } from "../components/store-cards/unassigned-card";
import { StoreCard } from "../components/store-cards/store-card";
import { ManageItemCard } from "../components/item-cards/manage-item-card";
import { useEffect, useMemo } from "react";

export default function HomePage() {
  const { data: items_data, loading: itemsLoading, error: itemsError, refetch: refetchItems } = useGetItems();
  const { data: stores_data, loading: storesLoading, error: storesError, refetch: refetchStores } = useGetStores();

  useEffect(() => {
    console.log({ items: items_data, stores: stores_data });
  }, [items_data, stores_data]);

  const { unassignedItemCards, storeCards } = useMemo(() => {
    if (!items_data) return { unassignedItemCards: [], storeCards: [] };
    const unassignedItems = items_data.filter(x => x.StoreID === null);
    const unassCards = unassignedItems.map(u =>
      <ManageItemCard item={u}/>
    );

    if (!stores_data) return { unassignedItemCards: unassCards, storeCards: [] }
    
    const storeCards = stores_data.map(s => {
      const storeItems = items_data.filter(x => x.StoreID === s.idStore).map(i => <ManageItemCard item={i} />);
      return <StoreCard store={s} storeItems={storeItems} />
    });

    return { unassignedItemCards: unassCards, storeCards: storeCards }
  }, [JSON.stringify(items_data), JSON.stringify(stores_data)]);

  return (
    <div className="home-page">
      <div className="main-column">
        <UnassignedCard itemCards={unassignedItemCards} refetchItems={refetchItems} />
      </div>
      <div className="store-cards">
        {storeCards}
        
      </div>
      <button className="new-store-button">{`+`}</button>
    </div>
  );
}
