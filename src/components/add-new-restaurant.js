import { useState } from "react";
import { useSession } from "next-auth/react"
import axios from 'axios';
import { useRouter } from "next/router";

export default function AddNewRestaurant(props) {
  const router = useRouter();
  const { data: session } = useSession()

  const name = props.name;
  const setName = props.setName

  const address = props.address;
  const setAddress = props.setAddress

  const cancelNewRestaurant = () => {

  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    if (session) {
      const name = event.target.name.value;
      const address = event.target.address.value;
      const UserId = session.user.id;

      const data = {name, address, UserId}

      const endpoint = "/api/restaurants/new"

      await axios.post(endpoint, data)
      .then((res) => {
       
        router.push(`/restaurant-dashboard?${res.data.id}`)
      })
    }
  }

  return (
    <div className="flex flex-col p-2 bg-slate-200 rounded-md">
      <div className="flex flex-row justify-center">
        New Restaurant:
      </div>
      <form onSubmit={handleSubmit} action="/api/restaurants" method="POST">

        <label htmlFor="name">Restaurant Name: </label>
        <br></br>

        <input
          className="rounded-md border-2 border-blue-800 my-1"
          onChange={(event) => {
            setName(event.target.value)
          }}
          value={name}
          type="text"
          id="name"
          name="name"
        ></input>
        <br></br>

        <label htmlFor="name">Address: </label>
        <br></br>

        <input
          className="rounded-md border-2 border-blue-800 my-1"
          onChange={(event) => {
            setAddress(event.target.value)
          }}
          value={address}
          type="text"
          id="address"
          name="address"
        ></input>
        <br></br>

        <div className="flex justify-center">
          <button className="border-2 border-blue-800 p-1 rounded-md hover:bg-blue-700 hover:text-slate-200" type="submit">Submit</button>

        </div>
      </form>
    </div>
  )
}