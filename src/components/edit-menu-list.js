import EditMenuListItem from "./edit-menu-list-item"

export default function EditMenuList (props) {
  const itemComponents = props.items.map((item) => {
    return (
      <EditMenuListItem
      key={item.id}
      id={item.id}
      name={item.name}
      priceCents={item.priceCents}
      estTime={item.estTime}
      ></EditMenuListItem>
    )
  })
  return (
    <div className="border-2 border-yellow-600 rounded-md m-2 p-2">
    {itemComponents}
    </div>
  )
}