import { useEffect, useState, useMemo } from "react";
import { useGetActiveTrip } from "../api-hooks/get/use-get-active-trip";
import { useGetItems } from "../api-hooks/get/use-get-items";
import { useGetStores } from "../api-hooks/get/use-get-stores";
import "./ShoppingPage.css";
import { ItemStatus, TripStatus } from "../utils/types";
import { TripPickerCard } from "../components/trip-components/trip-picker-card";
import { useGetTripItems } from "../api-hooks/get/use-get-trip-items";
import { UnassignedCard } from "../components/store-cards/unassigned-card";
import { StoreCard } from "../components/store-cards/store-card";
import { ShopItemCard } from "../components/item-cards/shop-item-card";
import { useCompleteTrip } from "../api-hooks/patch/use-complete-trip";
import { useNavigate } from "react-router-dom";

export default function ShoppingPage() {
  const [activeTripId, setActiveTripId] = useState(null);
  const { data, loading, error, refetch } = useGetActiveTrip();
  const { data: items_data, loading: itemsLoading, error: itemsError, refetch: refetchItems } = useGetItems();
  const { data: stores_data, loading: storesLoading, error: storesError, refetch: refetchStores } = useGetStores();
  const { data: trip_items_data } = useGetTripItems(activeTripId);
  const { completeTrip } = useCompleteTrip();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    if (data && data.Status === TripStatus.Active && data.idTrip) {
      setActiveTripId(data.idTrip);
    } else {
      setActiveTripId(null)
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

  async function endTrip() {
    try {
      await completeTrip(activeTripId);
      navigate("/home")
    } catch (e) { 
      console.error(e);
    }
  }

  const tripOptions = useMemo(() => {
    const options = [];
    if (activeTripId) return options;
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
    options.push(<TripPickerCard label="Unassigned" items={unassignedItems} refetchDash={refetchShoppingDetails}/>);

    if (stores_data && stores_data.length > 0) {
      const allItems = items_data.filter(i => i.Status !== ItemStatus.Inactive).map(x => x.idItem);
      options.push(<TripPickerCard label="All" items={allItems} refetchDash={refetchShoppingDetails}/>)
    };

    return options;
  }, [activeTripId, JSON.stringify(items_data), JSON.stringify(stores_data)]);

  const tripItems = useMemo(() => {
    if (!trip_items_data || !items_data) return [];
    return items_data.filter(x => trip_items_data.item_ids.includes(x.idItem) && x.Status !== ItemStatus.Inactive);
  }, [JSON.stringify(trip_items_data), JSON.stringify(items_data)]);

  const shopCards = useMemo(() => {
    const cards = [];
    if (!items_data || !tripItems.length) return cards;

    const unassignedItems = tripItems.filter(x => x.StoreID === null);
    const unassCards = unassignedItems.map(u =>
      <ShopItemCard key={u.idItem} item={u} refetchItems={refetchItems} />
    );

    if (unassignedItems.length > 0) {
      cards.push(<UnassignedCard itemCards={unassCards} refetchItems={refetchItems} isShop={true}/>)
    }

    if (!stores_data) return shopCards;
    
    const storeCards = stores_data.sort((s1, s2) => s1.Name.localeCompare(s2.Name)).map(s => {
      const storeItems = tripItems.filter(x => x.StoreID === s.idStore).map(i => <ShopItemCard key={i.idItem} item={i} refetchItems={refetchItems} />);
      if (storeItems.length > 0) {
        return <StoreCard store={s} itemCards={storeItems} />
      }
    });

    cards.push(storeCards);

    return cards;
  }, [tripItems, JSON.stringify(items_data), JSON.stringify(stores_data)]);


  if (!activeTripId) return (
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
        {shopCards}
        <button
          className="end-trip-button"
          onClick={endTrip}
        >
          Complete Trip
        </button>
    </div>
  );
}
