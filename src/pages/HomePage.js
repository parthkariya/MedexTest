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

const HomePage = () => {
  const { fetchProducts, products } = useProductsContext();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchProducts(`${products_url}${0}/${1}`);
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
