import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  INCREASE_CART_QTY,
  RESTORE_QTY,
  RESTORE_TOTAL,
  DECREASE_CART_QTY,
} from "../action";

const cart_reducer = (state, action) => {
  const tempCart = state.cart;
  // console.log("=====",action.payload)

  // eslint-disable-next-line default-case
  switch (action.type) {
    case ADD_TO_CART:
      const dat = state.cart.find((i) => i.id === action.payload.id);
      // console.log(dat);
      if (state.cart.some((i) => i.id === action.payload.id)) {
        // console.log("=====exist");
        return { ...state };
      } else {
        tempCart.push(action.payload);
        const total =
          state.total +
          action.payload.gstIncludePrice * Number(action.payload.user_qty);
        localStorage.setItem("cart", JSON.stringify(tempCart));
        localStorage.setItem("total", JSON.stringify(total));
        // console.log("======", state.total, action.payload.gstIncludePrice, action.payload.user_qty, total)
        return { ...state, cart: tempCart, total: total };
      }

    case REMOVE_CART_ITEM:
      const Temp = state.cart.filter((i) => i.id !== action.payload.id);
      const temp_item = state.cart.find(
        (element) => element.id === action.payload.id
      );
      const total_rem =
        state.total - temp_item.gstIncludePrice * Number(temp_item.user_qty);
      // console.log(temp_item);
      localStorage.setItem("cart", JSON.stringify(Temp));
      localStorage.setItem("total", JSON.stringify(total_rem));

      return { ...state, cart: Temp, total: total_rem };

    case INCREASE_CART_QTY:
      // console.log("=====",action.payload)

      const temp = state.cart;
      temp[action.payload.item].user_qty =
        Number(state.cart[action.payload.item].user_qty) +
        action.payload.add_qty;
      // const total_inc =
      //   Number(state.total) +  temp[action.payload.item].gstIncludePrice;
      const total_inc =
        Number(state.total) +
        action.payload.add_qty * temp[action.payload.item].gstIncludePrice;
      localStorage.setItem("cart", JSON.stringify(temp));
      localStorage.setItem("total", JSON.stringify(total_inc));
      return { ...state, cart: temp, total: total_inc };

    case DECREASE_CART_QTY:
      const temp1 = state.cart;
      temp1[action.payload.item].user_qty =
        state.cart[action.payload.item].user_qty - action.payload.dec_qty;
      // const total_dec =
      //   Number(state.total) - temp1[action.payload.item].gstIncludePrice;
      const total_dec =
        Number(state.total) -
        action.payload.dec_qty * temp1[action.payload.item].gstIncludePrice;
      // temp1[action.payload].user_price =
      //   state.cart[action.payload].user_price -
      //   state.cart[action.payload].selectedItemDetails[0].wholesale_price;
      localStorage.setItem("cart", JSON.stringify(temp1));
      localStorage.setItem("total", JSON.stringify(total_dec));

      return { ...state, cart: temp1, total: total_dec };

    case RESTORE_QTY:
      return { ...state, get_qty: action.payload };

    case RESTORE_TOTAL:
      return { ...state, total: action.payload };
  }

  //  if (action.type === REMOVE_CART_ITEM) {
  //    const tempCart = state.cart.filter((i) => i.id !== action.payload);
  //   return { ...state, cart: tempCart };
  //  }

  return state;
};

export default cart_reducer;
