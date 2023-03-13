export default function NearbyRestaurantsListItem (props) {
return (
  <div>
    name: {props.name}
    <br></br>
    {props.address}
  </div>
)
}