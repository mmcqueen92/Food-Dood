import EditMenuList from "@/components/edit-menu-list";
import { useState } from "react";
import { useSession } from "next-auth/react"
import axios from 'axios';
import { prisma } from '../../server/db/client';
import Saving from '../components/saving';



export async function getServerSideProps({ query }) {

  const parsed = parseInt(Object.keys(query))

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: parsed
    }
  });

  const items = await prisma.item.findMany({
    where: {
      restaurantId: parsed
    }
  })

  return {
    props: {
      restaurant,
      items
    }
  }
}

export default function UpdateRestaurant(props) {
  const session = useSession()

  if (session) {
    const [name, setName] = useState(props.restaurant.name || null);
    const [address, setAddress] = useState(props.restaurant.address || null);
    const [items, setItems] = useState(props.items || null)
    const [editName, setEditName] = useState("inactive");
    const [editAddress, setEditAddress] = useState("inactive");
    const [newItem, setNewItem] = useState("inactive");
    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState(0);
    const [newItemTime, setNewItemTime] = useState(0);



    const saveName = async (event) => {
      setEditName("saving");
      event.preventDefault()

      if (session.data.user.id === props.restaurant.UserId) {

        const type = "updateName";
        const newValue = event.target.name.value;
        const restaurantId = props.restaurant.id;
        const data = { type, newValue, restaurantId }
        const endpoint = "/api/restaurants/update"

        await axios.post(endpoint, data)
        .then(setEditName("inactive"));

      } else {

      }

    }

    const saveAddress = async (event) => {
      setEditAddress("saving");
      event.preventDefault()

      if (session.data.user.id === props.restaurant.UserId) {

        const type = "updateAddress";
        const newValue = event.target.address.value;
        const restaurantId = props.restaurant.id;
        const data = { type, newValue, restaurantId }
        const endpoint = "/api/restaurants/update"

        await axios.post(endpoint, data)
          .then(() => {
            setEditAddress("inactive");
          })

      } else {

      }
    }

    const saveNewItem = async (event) => {
      event.preventDefault();


      if (session.data.user.id === props.restaurant.UserId) {
        const type = "newItem";
        const name = newItemName;
        const restaurantId = props.restaurant.id;
        const priceCents = newItemPrice * 100;
        const estTime = newItemTime;
        const data = { name, restaurantId, priceCents, estTime };
        const endpoint = "api/items/new"

        await axios.post(endpoint, data)
          .then((res) => {

            const createdItem = res.data;
            const newState = [...items, createdItem]
  
            setNewItem("inactive")
            setItems(newState)
          })
      }
    }

    return (
      <>

        This is the Edit Restaurant page for:<br></br>
        <div>

          {editName === "inactive" && (
            <div className="flex flex-row">
              <div className="bg-green-500 text-xl text-white m-2 p-2 rounded-md">
                {name}
              </div>
              <button
                onClick={() => {
                  setEditName("edit")
                }}
                className="border-2 border-green-500 rounded-md p-1 m-2"
              >Edit</button>
            </div>
          )}

          {editName === "edit" && (
            <div className="flex flex-row">
              <form
                onSubmit={saveName}
              >
                <div>
                  <input
                    type="text"
                    className="rounded-md border-2 border-green-500 my-1"
                    onChange={(event) => {
                      setName(event.target.value)
                    }}
                    value={name}
                    id="name"
                    name="name"
                  ></input>
                </div>
                <div>
                  <button
                    className="border-2 border-green-500 rounded-md p-1 m-2"
                    type="submit"
                  >Save</button>
                </div>
              </form>
            </div>
          )}

          {editName === "saving" && (
            <Saving></Saving>
          )}

        </div>

        Located at <div>

          {editAddress === "inactive" && (
            <div className="flex flex-row">
              <div className="bg-green-500 text-xl text-white m-2 p-2 rounded-md">
                {address}
              </div>
              <button
                onClick={() => {
                  setEditAddress("edit")
                }}
                className="border-2 border-green-500 rounded-md p-1 m-2"
              >Edit</button>
            </div>
          )}

          {editAddress === "edit" && (
            <div className="flex flex-row">
              <form
                onSubmit={saveAddress}
              >
                <div>
                  <input
                    type="text"
                    className="rounded-md border-2 border-green-500 my-1"
                    onChange={(event) => {
                      setAddress(event.target.value)
                    }}
                    value={address}
                    id="address"
                    name="address"
                  ></input>
                </div>
                <div>
                  <button
                    className="border-2 border-green-500 rounded-md p-1 m-2"
                    type="submit"
                  >Save</button>
                </div>
              </form>
            </div>
          )}

        </div>
        <div className="flex flex-row">
          <div className="flex flex-col border-2 border-yellow-600 rounded-md w-3/5 m-2 p-2">
            <div className="flex flex-row justify-between">
              <div>
                Menu:
              </div>
              <div>
                <button className="border-2 border-green-500 p-2 rounded-md"
                  onClick={() => { setNewItem("active") }}
                >Add New Item to Menu</button>
              </div>
            </div>

            <EditMenuList
              items={items}
            ></EditMenuList>
          </div>
          {newItem === "active" && (
            <div className="border-2 border-yellow-600 m-2 rounded-md p-2">
              <form
                onSubmit={saveNewItem}
              >
                <h1>Add New Item:</h1>

                <div className="flex flex-col">
                  <label className="m-2" htmlFor="newItemName">Item Name:</label>
                  <input
                    type="text"
                    className="rounded-md border-2 border-green-500 my-1"
                    onChange={(event) => {
                      setNewItemName(event.target.value)
                    }}
                    value={newItemName}
                    id="newItemName"
                    name="newItemName"
                  ></input>
                </div>



                <div className="flex flex-col">
                  <label className="m-2" htmlFor="newItemPrice">Item Price ($):</label>
                  <input
                    type="number"
                    className="rounded-md border-2 border-green-500 my-1"
                    onChange={(event) => {
                      setNewItemPrice(event.target.value)
                    }}
                    value={newItemPrice}
                    id="newItemPrice"
                    name="newItemPrice"
                  ></input>
                </div>

                <div className="flex flex-col">
                  <label className="m-2" htmlFor="newItemTime">Prep Time:</label>
                  <input
                    type="number"
                    className="rounded-md border-2 border-green-500 my-1"
                    onChange={(event) => {
                      setNewItemTime(event.target.value)
                    }}
                    value={newItemTime}
                    id="newItemTime"
                    name="newItemTime"
                  ></input>
                </div>

                <button
                  className="border-2 border-green-500 rounded-md p-1"
                  type="submit"
                >Save</button>

              </form>
            </div>
          )}
        </div>




      </>
    )
  }


  else {
    return (
      <div>
        Log in bro
      </div>
    )
  }

}