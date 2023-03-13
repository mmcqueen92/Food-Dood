import { useState } from "react";
import axios from 'axios';

export default function EditMenuListItem(props) {
  const [editItem, setEditItem] = useState("inactive");
  const [itemName, setItemName] = useState(props.name);
  const [itemPriceCents, setItemPriceCents] = useState(props.priceCents);
  const [itemEstTime, setItemEstTime] = useState(props.estTime);
  const id = props.id;




  const priceDollars = (itemPriceCents / 100).toFixed(2);
  const name = itemName;
  const estTime = itemEstTime;

  const saveEditedItem = async (event) => {
    event.preventDefault();

    const type = "editItem";
    const name = itemName;
    const priceCents = itemPriceCents;
    const estTime = itemEstTime
    const data = {type, name, priceCents, estTime, id}
    const endpoint = "/api/items/edit"

    await axios.post(endpoint,data)
    .then((res) => {

      setEditItem("inactive")
    })

  }



  return (
    <div className="border-2 border-green-800 rounded-md m-2 p-2 flex flex-row justify-between">

      {editItem === "inactive" && (
        <div className="flex flex-row justify-between w-full">
          <div>
            Item: {name}
            <br></br>
            Price: ${priceDollars}
            <br></br>
            Prep Time: {estTime} minutes
          </div>
          <button
            className="border-2 border-green-500 m-1 p-1 rounded-md"
            onClick={() => { setEditItem("active") }}
          >Edit Item</button>
        </div>
      )}

      {editItem === "active" && (
        <form
        className="flex flex-row w-full justify-between items-center"
        onSubmit={saveEditedItem}
        >
          <div className="flex flex-col">
            <div className="flex flex-row">
              <label className="m-2" htmlFor="itemName">New Item Name:</label>
              <input
                type="text"
                className="rounded-md border-2 border-green-500 my-1"
                onChange={(event) => {
                  setItemName(event.target.value)
                }}
                value={itemName}
                id="itemName"
                name="itemName"
              ></input>
            </div>

            <div className="flex flex-row">
              <label className="m-2" htmlFor="itemPriceCents">New Item Price:</label>
              <input
                type="text"
                className="rounded-md border-2 border-green-500 my-1"
                onChange={(event) => {
                  setItemPriceCents(event.target.value)
                }}
                value={itemPriceCents}
                id="itemPriceCents"
                name="itemPriceCents"
              ></input>

            </div>

            <div className="flex flex-row">
              <label className="m-2" htmlFor="itemEstTime">New Item Prep Time:</label>
              <input
                type="text"
                className="rounded-md border-2 border-green-500 my-1"
                onChange={(event) => {
                  setItemEstTime(event.target.value)
                }}
                value={itemEstTime}
                id="itemEstTime"
                name="itemEstTime"
              ></input>

            </div>
          </div>
          <button
            className="border-2 border-green-500 m-1 p-1 rounded-md h-min"
            type="submit"
          >Save</button>
        </form>
      )}



    </div>
  )
}