export default function NearbyRestaurantsListItem (props) {
return (
  <div
  className="border-2 border-blue-700 bg-slate-200 rounded-md m-1 p-1 w-full hover:bg-blue-700 hover:text-slate-200"
  >
    {props.name}
    <br></br>
    {props.address}
  </div>
)
}