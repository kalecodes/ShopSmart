import { useEffect, useMemo, useRef, useState } from "react";
import "./HomePage.css";
import { useGetItems } from "../api-hooks/get/use-get-items";
import { useGetStores } from "../api-hooks/get/use-get-stores";
import { useAddStore } from "../api-hooks/post/use-add-store";
import { UnassignedCard } from "../components/store-cards/unassigned-card";
import { StoreCard } from "../components/store-cards/store-card";
import { ManageItemCard } from "../components/item-cards/manage-item-card";
import { ActionMenu } from "../components/modals/item-action-menu";
import { Modal } from '../components/modals/base-modal';
import { Status } from "../utils/types";

export default function HomePage() {
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [storeName, setStoreName] = useState("");
  const menuRef = useRef();
  const [menuState, setMenuState] = useState({
    open: false,
    anchorEl: null,
    item: null,
  });
  const { data: items_data, loading: itemsLoading, error: itemsError, refetch: refetchItems } = useGetItems();
  const { data: stores_data, loading: storesLoading, error: storesError, refetch: refetchStores } = useGetStores();
  const { addStore, loading, error } = useAddStore();

  async function handleAddStore() {
    if (!storeName.trim()) return;

    try {
      await addStore(storeName);
      setStoreName("");
      await refetchStores();
      setStoreModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!menuState.open) return;

    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuState.anchorEl &&
        !menuState.anchorEl.contains(e.target)
      ) {
        setMenuState((s) => ({ ...s, open: false }));
      }
    };

    document.addEventListener("mousedown", handleClick);
  }, [menuState.open]);

  function openActionMenu(item, buttonEl) {
    setMenuState({
      open: true,
      anchorEl: buttonEl,
      item,
    });
  };

  function closeActionMenu() {
    setMenuState((s) => ({ ...s, open: false }));
  }

  const stores = useMemo(() => {
    return stores_data;
  }, [JSON.stringify(stores_data)]);

  const { unassignedItemCards, storeCards } = useMemo(() => {
    console.log({ items: items_data, stores: stores_data });
    if (!items_data) return { unassignedItemCards: [], storeCards: [] };
    const unassignedItems = items_data.filter(x => x.StoreID === null && x.Status !== Status.Inactive);
    const unassCards = unassignedItems.map(u =>
      <ManageItemCard key={u.idItem} item={u} onOpenMenu={openActionMenu} />
    );

    if (!stores_data) return { unassignedItemCards: unassCards, storeCards: [] }
    
    const storeCards = stores_data.map(s => {
      const storeItems = items_data.filter(x => x.StoreID === s.idStore && x.Status !== Status.Inactive).map(i => <ManageItemCard key={i.idItem} item={i} onOpenMenu={openActionMenu} />);
      return <StoreCard store={s} itemCards={storeItems} />
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
      <ActionMenu 
        ref={menuRef}
        open={menuState.open}
        anchorEl={menuState.anchorEl}
        item={menuState.item}
        onClose={closeActionMenu}
        stores={stores}
        refetchItems={refetchItems}

      />
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
          <button onClick={handleAddStore}>Add</button>
        </div>
      </Modal>
    </div>
  );
}
