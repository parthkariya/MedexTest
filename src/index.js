import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user_context";
import { HomeProvider } from "./context/home_context";
import { ProductsProvider } from "./context/products_context";
import { CartProvider } from "./context/cart_context";
import { OrderProvider } from "./context/place_order_context";

ReactDOM.render(
  <UserProvider>
    <HomeProvider>
      <ProductsProvider>
        <CartProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CartProvider>
      </ProductsProvider>
    </HomeProvider>
  </UserProvider>,

  document.getElementById("root")
);
