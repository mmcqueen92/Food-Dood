import Link from 'next/link';
import { useState } from 'react';
import AddNewRestaurant from './add-new-restaurant';
import ProfileViewRestaurantsList from '../components/profile-view-restaurants-list';


export default function ProfileOptions(props) {
  const [options, setOptions] = useState("list");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const restaurants = props.restaurants

  if (options === "list") {
    return (
      <div className="flex flex-col">
        <button onClick={() => { setOptions("add-new-restaurant") }}>Add New Restaurant</button>
        <button onClick={() => { setOptions("view-restaurants") }}>View your Restaurants</button>
      </div>
    )
  }

  if (options === "add-new-restaurant") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-start">
          <button onClick={() => { setOptions("list") }} className="border-2 border-green-500 m-2 rounded-md p-1">Back</button>
        </div>
        <AddNewRestaurant
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
        ></AddNewRestaurant>
      </div>
    )
  }

  if (options === "view-restaurants") {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-start">
          <button onClick={() => { setOptions("list") }} className="border-2 border-green-500 m-2 rounded-md p-1">Back</button>
        </div>

        <div className="flex flex-row justify-center">
          <ProfileViewRestaurantsList
            restaurants={restaurants}
          ></ProfileViewRestaurantsList>
        </div>
      </div>
    )
  }

}