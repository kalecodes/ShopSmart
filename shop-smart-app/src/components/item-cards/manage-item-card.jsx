


export const ManageItemCard = (item) => {
    return (
        <div id={item.id}>
            <p>{item.name}</p>
            <button>{`>`}</button>
        </div>
    )
}