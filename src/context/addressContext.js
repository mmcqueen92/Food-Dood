import { createContext, useState} from "react";

export const AddressContext = createContext({
  address: "",
});

export const AddressProvider = ({ children }) => {
  const [ address, setAddress ] = useState("");

  const value = {
    address,
    setAddress
  }

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
}