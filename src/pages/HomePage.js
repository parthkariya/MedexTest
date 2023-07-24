import axios from "axios";
import React, { useEffect } from "react";
import {
  Banner,
  LearnMore,
  Popular,
  Products,
  Testimonials,
} from "../container";
import { useProductsContext } from "../context/products_context";
import { accept_header, home_url, products_url } from "../Utils/constatns";
import { useUserContext } from "../context/user_context";

const HomePage = () => {
  const { fetchProducts, products } = useProductsContext();
  const { userid, setLogin } = useUserContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    const user_id = localStorage.getItem("userid");

    if (user_id === "") {
      fetchProducts(`${products_url}${0}/${1}`);
    } else {
      fetchProducts(`${products_url}${userid}/${1}`);
    }
  }, []);

  return (
    <main>
      {/* <div> */}
      <Banner />
      <Products />
      <LearnMore />
      <Testimonials />
      <Popular />
      {/* <Footer /> */}
      {/* </div> */}
    </main>
  );
};

export default HomePage;
