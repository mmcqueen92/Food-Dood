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
    const [newItemDesc, setNewItemDesc] = useState("");



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
        const description = newItemDesc;
        const data = { name, restaurantId, priceCents, estTime, description };
        const endpoint = "api/items/new"

        await axios.post(endpoint, data)
          .then((res) => {

            const createdItem = res.data;
            const newState = [...items, createdItem]

            setNewItem("inactive")
            setItems(newState)
            setNewItemName("")
            setNewItemPrice("")
            setNewItemTime("")
          })
      }
    }

    const cancelNewItem = () => {
      setNewItem("inactive")
      setNewItemName("")
      setNewItemPrice(0)
      setNewItemTime(0)
      setNewItemDesc("")
    }

    return (
      <div className="flex flex-col items-center">

        <div className="flex flex-col w-4/5 items-center border-2 border-blue-800 rounded-md m-5 p-2 bg-green-400">

          This is the Edit Restaurant page for:<br></br>
          <div>

            {editName === "inactive" && (
              <div className="flex flex-row">
                <div className="text-2xl text-bold underline text-blue-800 m-2 p-2 rounded-md">
                  {name}
                </div>
                <button
                  onClick={() => {
                    setEditName("edit")
                  }}
                  className="border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 rounded-md p-1 m-2"
                >Edit Name</button>
              </div>
            )}

            {editName === "edit" && (
              <div className="flex flex-row">
                <form
                  onSubmit={saveName}
                  className="flex flex-row"
                >
                  <div>
                    <input
                      type="text"
                      className="rounded-md border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 my-1 p-1"
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
                      className="border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 rounded-md p-1 m-1"
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

          Located at: <div>

            {editAddress === "inactive" && (
              <div className="flex flex-row">
                <div className="text-2xl text-blue-800 underline m-2 p-2 rounded-md">
                  {address}
                </div>
                <button
                  onClick={() => {
                    setEditAddress("edit")
                  }}
                  className="border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 rounded-md p-1 m-2"
                >Edit Address</button>
              </div>
            )}

            {editAddress === "edit" && (
              <div className="flex flex-row">
                <form
                  onSubmit={saveAddress}
                  className="flex flex-row"
                >
                  <div>
                    <input
                      type="text"
                      className="rounded-md border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 my-1 p-1"
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
                      className="border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 rounded-md p-1 m-1"
                      type="submit"
                    >Save</button>
                  </div>
                </form>
              </div>
            )}

          </div>
          <div className="flex flex-row w-full justify-center">
            <div className="flex flex-col border-2 border-blue-800 rounded-md m-2 p-2 w-3/5 bg-slate-200">
              <div className="flex flex-row justify-center text-3xl underline">
                Menu:
              </div>
              <div className="flex flex-row justify-end">
                <button className="border-2 border-blue-800 bg-slate-200 hover:bg-blue-700 hover:text-slate-200 p-2 rounded-md"
                  onClick={() => { setNewItem("active") }}
                >Add New Item to Menu</button>
              </div>

              <EditMenuList
                items={items}
              ></EditMenuList>
            </div>
            {newItem === "active" && (
              <div className="border-2 border-blue-800 m-2 rounded-md p-2 bg-slate-200">
                <form
                  onSubmit={saveNewItem}
                >
                  <h1>Add New Item:</h1>

                  <div className="flex flex-col">
                    <label className="my-2" htmlFor="newItemName">Item Name:</label>
                    <input
                      type="text"
                      className="rounded-md border-2 border-blue-800 bg-slate-200 my-1"
                      onChange={(event) => {
                        setNewItemName(event.target.value)
                      }}
                      value={newItemName}
                      id="newItemName"
                      name="newItemName"
                    ></input>
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2" htmlFor="newItemDesc">Item Description:</label>
                    <input
                      type="text"
                      className="rounded-md border-2 border-blue-800 bg-slate-200 my-1"
                      onChange={(event) => {
                        setNewItemDesc(event.target.value)
                      }}
                      value={newItemDesc}
                      id="newItemDesc"
                      name="newItemDesc"
                    ></input>
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2" htmlFor="newItemPrice">Item Price ($):</label>
                    <input
                      type="number"
                      className="rounded-md border-2 border-blue-800 bg-slate-200my-1"
                      onChange={(event) => {
                        setNewItemPrice(event.target.value)
                      }}
                      value={newItemPrice}
                      id="newItemPrice"
                      name="newItemPrice"
                    ></input>
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2" htmlFor="newItemTime">Prep Time:</label>
                    <input
                      type="number"
                      className="rounded-md border-2 border-blue-800 bg-slate-200 my-1"
                      onChange={(event) => {
                        setNewItemTime(event.target.value)
                      }}
                      value={newItemTime}
                      id="newItemTime"
                      name="newItemTime"
                    ></input>
                  </div>
                  <div className="flex flex-row justify-between">
                    <button
                      className="border-2 border-blue-800 rounded-md p-1 bg-slate-200 hover:bg-blue-700 hover:text-slate-200"
                      type="submit"
                    >Save</button>
                    <button
                      className="border-2 border-blue-800 rounded-md p-1 bg-slate-200 hover:bg-blue-700 hover:text-slate-200"
                      onClick={cancelNewItem}
                    >Cancel
                    </button>
                  </div>

                </form>
              </div>
            )}
          </div>




        </div>
      </div>
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