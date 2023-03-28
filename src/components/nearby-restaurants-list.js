import NearbyRestaurantsListItem from "./nearby-restaurants-list-item";
import Link from 'next/link';

export default function NearbyRestaurantsList(props) {
  const restaurantsArray = props.restaurants

  const itemArray = restaurantsArray.map((restaurant) => {
    return (
      <Link
        key={restaurant.id}
        href={{
          pathname: '/view-restaurant',
          query: restaurant.id
        }}
      >
        <NearbyRestaurantsListItem
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          address={restaurant.address}
        ></NearbyRestaurantsListItem>

      </Link>
    )
  })

  return (

    <div className="flex flex-col items-center w-full">
      <div className="text-blue-800">Nearby Restaurants</div>
      <div>
        {itemArray}
      </div>
    </div>
  )
}