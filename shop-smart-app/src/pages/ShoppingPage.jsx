import { useEffect, useState, useMemo } from "react";
import { useGetActiveTrip } from "../api-hooks/get/use-get-active-trip";
import { useGetItems } from "../api-hooks/get/use-get-items";
import { useGetStores } from "../api-hooks/get/use-get-stores";
import "./ShoppingPage.css";
import { ItemStatus } from "../utils/types";
import { TripPickerCard } from "../components/trip-components/trip-picker-card";

export default function ShoppingPage() {
  const { data, loading, error, refetch } = useGetActiveTrip();
  const { data: items_data, loading: itemsLoading, error: itemsError, refetch: refetchItems } = useGetItems();
  const { data: stores_data, loading: storesLoading, error: storesError, refetch: refetchStores } = useGetStores();
  const [activeTrip, setActiveTrip] = useState(false);

  useEffect(() => {
    console.log(data);
    if (!data || data.active === false) {
      setActiveTrip(false);
    }
  }, [data]);

  async function refetchShoppingDetails() {
    try {
      await refetchItems()
      await refetchStores()
      await refetch();
    } catch (e) {
      console.error(e);
    }
  }

  const tripOptions = useMemo(() => {
    const options = [];
    if (activeTrip) return options;
    if (!items_data) return options;

    if (stores_data && stores_data.length > 0) {
      stores_data.sort((s1, s2) => s1.Name.localeCompare(s2.Name)).forEach(s => {
        const storeItems = items_data.filter(i => i.StoreID === s.idStore && i.Status !== ItemStatus.Inactive).map(x => x.idItem);
        if (storeItems.length > 0) {
          options.push(<TripPickerCard label={s.Name} items={storeItems} refetchDash={refetchShoppingDetails}/>)
        }
      });
    }

    const unassignedItems = items_data.filter(x => x.StoreID === null && x.Status !== ItemStatus.Inactive).map(x => x.idItem);
    console.log(unassignedItems);
    options.push(<TripPickerCard label="Unassigned" items={unassignedItems} refetchDash={refetchShoppingDetails}/>);

    if (stores_data && stores_data.length > 0) {
      const allItems = items_data.filter(i => i.Status !== ItemStatus.Inactive).map(x => x.idItem);
      options.push(<TripPickerCard label="All" items={allItems} refetchDash={refetchShoppingDetails}/>)
    };

    return options;
  }, [activeTrip, JSON.stringify(items_data), JSON.stringify(stores_data)])

// const { unassignedItemCards, storeCards } = useMemo(() => {
//     console.log({ items: items_data, stores: stores_data });
//     if (!items_data) return { unassignedItemCards: [], storeCards: [] };
//     const unassignedItems = items_data.filter(x => x.StoreID === null && x.Status !== ItemStatus.Inactive);
//     const unassCards = unassignedItems.map(u =>
//       <ManageItemCard key={u.idItem} item={u} onOpenMenu={openActionMenu} />
//     );

//     if (!stores_data) return { unassignedItemCards: unassCards, storeCards: [] }
    
//     const storeCards = stores_data.sort((s1, s2) => s1.Name.localeCompare(s2.Name)).map(s => {
//       const storeItems = items_data.filter(x => x.StoreID === s.idStore && x.Status !== ItemStatus.Inactive).map(i => <ManageItemCard key={i.idItem} item={i} onOpenMenu={openActionMenu} />);
//       return <StoreCard store={s} itemCards={storeItems} />
//     });

//     return { unassignedItemCards: unassCards, storeCards: storeCards }
//   }, [JSON.stringify(items_data), JSON.stringify(stores_data)]);





  if (!activeTrip) return (
    <div className="new-trip-page">
      <div className="new-trip-form">
        {tripOptions.length > 0
          ? <h2 className="new-trip-title">Select a store to start a new shopping trip:</h2> 
          : <h2 className="new-trip-title">No items to shop...</h2>
        }
        {tripOptions}
      </div>
    </div>

  )

  return (
    <div className="shopping-page">
      <h1 className="shopping-title">Your Shopping Lists</h1>
      <p className="shopping-text">
        Track, update, and organize your shopping items by store.
      </p>
    </div>
  );
}
