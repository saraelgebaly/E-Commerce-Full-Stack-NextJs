import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);
export const useCart = () => {
  return useContext(CartContext);
};
export default function CartContextProvider(props) {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {props.children}
    </CartContext.Provider>
  );
}
