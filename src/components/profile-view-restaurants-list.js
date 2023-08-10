import ProfileViewRestaurantsListItem from "./profile-view-restaurants-list-item";
import Link from "next/link";

export default function ProfileViewRestaurantsList(props) {
  const restaurants = props.restaurants;


  const restaurantComponents = restaurants.map((restaurant) => {
    return (
      <div className="flex flex-col m-2 p-2" key={restaurant.id}>
        <div className="flex flex-col border-2 bg-white border-blue-600 m-2 p-2 rounded-md">
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
        </div>

      </div>
    )


  })

  return (
    <div>
      {restaurantComponents}

    </div>
  )
}