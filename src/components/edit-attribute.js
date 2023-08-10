import { useState } from "react";

export default function EditAttribute(props) {
  const [edit, setState] = useState(false);
  // const [value, setValue] = useState(props.value);
  const value = props.value;
  const setValue = props.setValue;
  
  return (
    <div>

      {edit === false && (
        <div className="flex flex-row">
          <div className="bg-green-500 text-xl text-white m-2 p-2 rounded-md">
            {props.value}
          </div>
          <button
          onClick={() => {
            setState(true)
          }}
          className="border-2 border-green-500 rounded-md p-1 m-2"
          >Edit</button>
        </div>
      )}

      {edit === true && (
        <div className="flex flex-row">
          <div>
            <input
              type="text"
              className="rounded-md border-2 border-green-500 my-1"
              onChange={(event) => {
                setValue(event.target.value)
              }}
              value={value}
              id="attribute"
              name="attribute"
            ></input>
          </div>
          <div>
          <button
          className="border-2 border-green-500 rounded-md p-1 m-2"
          onClick={() => {
            setState(false)
          }}
          >Save</button>
          </div>
        </div>
      )}

    </div>

  )
}