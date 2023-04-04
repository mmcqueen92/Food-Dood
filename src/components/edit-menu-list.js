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
      description={item.description}
      ></EditMenuListItem>
    )
  })
  return (
    <div className="m-2 p-2">
    {itemComponents}
    </div>
  )
}