import ProfileViewRestaurantsListItem from "./profile-view-restaurants-list-item";
import Link from "next/link";

export default function ProfileViewRestaurantsList(props) {
  const restaurants = props.restaurants;
  

  const restaurantComponents = restaurants.map((restaurant) => {
    return (
      <Link
      key={restaurant.id}
        href={{
          pathname: '/restaurant-dashboard',
          query: restaurant.id
        }}
      >
      <ProfileViewRestaurantsListItem
        key={restaurant.id}
        id={restaurant.id}
        name={restaurant.name}
        address={restaurant.address}
      ></ProfileViewRestaurantsListItem>
      </Link>
    )


  })

  return (
    <div>
      {restaurantComponents}

    </div>
  )
}