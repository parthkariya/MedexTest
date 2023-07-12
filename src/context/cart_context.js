import React, { useContext, useEffect, useReducer } from "react";
import cart_reducer from "../reducer/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  INCREASE_CART_QTY,
  RESTORE_TOTAL,
  RESTORE_QTY,
  DECREASE_CART_QTY,
  SET_USER_QTY,
} from "../action";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const getTotal = () => {
  let cart = localStorage.getItem("total");
  if (cart) {
    return JSON.parse(localStorage.getItem("total"));
  } else {
    return 0;
  }
};

const initialState = {
  cart: getLocalStorage(),
  get_qty: 1,
  total: getTotal(),
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cart_reducer, initialState);

  const addToCartItem = async (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
    // localStorage.setItem("cart", JSON.stringify(state.cart));
  };

  const removeCartItem = (item) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: item });
  };
  // console.log("---remove ", removeCartItem);

  const increase_qty = async (item, add_qty) => {
    await dispatch({ type: INCREASE_CART_QTY, payload: { item, add_qty } });
    // countTotal()
    await countQty();
  };

  const descrease_qty = async (item, dec_qty) => {
    await dispatch({ type: DECREASE_CART_QTY, payload: { item, dec_qty } });
    // countTotal();
    await countQty();
  };

  const setUser_qty = async (item) => {
    await dispatch({ type: SET_USER_QTY, payload: item });
    await countQty();
  };

  const countQty = async () => {
    var total_qty = 0;
    for (var i = 0; i < state.cart.length; i++) {
      total_qty = total_qty + state.cart[i].qty;
    }
    dispatch({ type: RESTORE_QTY, payload: total_qty });
  };

  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify(state.cart));
    // const total = 0;
    // for (const i = 0; i < state.cart.length; i++) {
    //   total = total + Number(state.cart[i].price) * Number(state.cart[i].qty);
    // }
    // dispatch({ type: RESTORE_TOTAL, payload: total });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCartItem,
        removeCartItem,
        increase_qty,
        descrease_qty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
