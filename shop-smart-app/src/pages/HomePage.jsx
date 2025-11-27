import { useEffect, useMemo, useState } from "react";
import "./HomePage.css";
import { useGetItems } from "../api-hooks/get/use-get-items";
import { useGetStores } from "../api-hooks/get/use-get-stores";
import { useAddStore } from "../api-hooks/post/use-add-store";
import { UnassignedCard } from "../components/store-cards/unassigned-card";
import { StoreCard } from "../components/store-cards/store-card";
import { ManageItemCard } from "../components/item-cards/manage-item-card";
import { Modal } from '../components/modals/base-modal';

export default function HomePage() {
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [storeName, setStoreName] = useState("");
  const { data: items_data, loading: itemsLoading, error: itemsError, refetch: refetchItems } = useGetItems();
  const { data: stores_data, loading: storesLoading, error: storesError, refetch: refetchStores } = useGetStores();
  const { addStore, loading, error } = useAddStore();

  async function handleAddStore() {
    if (!storeName.trim()) return;

    try {
      await addStore(storeName);
      setStoreName("");
      refetchStores();
      setStoreModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  const { unassignedItemCards, storeCards } = useMemo(() => {
    console.log({ items: items_data, stores: stores_data });
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
      <button onClick={() => setStoreModalOpen(true)}className="new-store-button">{`+`}</button>
      <Modal open={storeModalOpen} onClose={() => setStoreModalOpen(false)}>
        <h2>Add a New Store</h2>
        <div className="new-store-form">
          <input 
            type="text" 
            id="store-input" 
            className="store-name-input" 
            placeholder="Add an Store.."
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <button onClick={() => handleAddStore()}>Add</button>
        </div>
      </Modal>
    </div>
  );
}
