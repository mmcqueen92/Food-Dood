import { createContext, useEffect, useState } from "react";


export const CartContext = createContext({
  cart: [],
});


export const CartProvider = ({ children }) => {
  const initialState = [];
  const [cart, setCart] = useState(initialState);


  const runSetCart = (data) => {
    setCart(data)
  }

  useEffect(() => {
    const cartFromLocalStorage = window.localStorage.getItem('food_dood_cart');
    const parsedCartFromLocalStorage = JSON.parse(cartFromLocalStorage);
    if (cartFromLocalStorage !== null) runSetCart(parsedCartFromLocalStorage);
  }, [])

  useEffect(() => {
    if (cart !== initialState) {
      localStorage.setItem("food_dood_cart", JSON.stringify(cart))

    }
  }, [cart])

  const addToCart = (product) => {
    if (cart.length > 0) {
      const restaurantId = cart[0].restaurantId;


      if (restaurantId === product.restaurantId) {
        const updatedCart = [...cart, product];
        runSetCart(updatedCart);

      } else if (restaurantId !== product.restaurantId) {

        alert("no mixing restaurants in 1 order bitch, clear your order first")
      }

    } else if (cart.length === 0) {
      const updatedCart = [...cart, product];
      runSetCart(updatedCart);

    }
    
    
    
    
    
    

  }

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (currentProduct) => currentProduct.id !== id
    );
    runSetCart(updatedCart);
  }

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.itemQuantity = item.itemQuantity + 1
      }
      return item;
    })
    runSetCart(updatedCart)
  }

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.itemQuantity = item.itemQuantity - 1
      }
      return item;
    })

    const removeZeroQuantity = updatedCart.filter(
      (currentProduct) => currentProduct.itemQuantity > 0
    )
    runSetCart(removeZeroQuantity);
  }

  const emptyCart = () => {
    runSetCart([])
    localStorage.setItem("food_dood_cart", JSON.stringify(cart))
  }

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

