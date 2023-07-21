import React, { useEffect } from "react";
import { CartItem } from "../container";
import { useCartContext } from "../context/cart_context";

const CartItemPage = () => {
  window.scrollTo(0, 0);

  return (
    <main style={{ marginTop: "7%", marginBottom: "2%" }}>
      <CartItem />
    </main>
  );
};

export default CartItemPage;
