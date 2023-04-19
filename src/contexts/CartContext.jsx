import { createContext, useContext, useReducer, useState } from "react";
import { cartReducer } from "../reducers/cartReducer";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
