import MenuListItem from "./menu-list-item"

export default function MenuList (props) {
  const itemComponents = props.items.map((item) => {
    return (
      <MenuListItem
      key={item.id}
      id={item.id}
      name={item.name}
      priceCents={item.priceCents}
      restaurantId={item.restaurantId}
      estTime={item.estTime}
      ></MenuListItem>
    )
  })
  return (
    <div className="border-2 border-yellow-600 rounded-md w-3/5 m-2 p-2">
    Menu:
    <br></br>
    {itemComponents}
    </div>
  )
}