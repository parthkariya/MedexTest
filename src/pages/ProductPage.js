import React, { useEffect, useState } from "react";
import ProductLIst from "../container/productList/ProductList";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { products_url } from "../Utils/constatns";

const ProductPage = (props) => {
  const { userid } = useUserContext();
  const { fetchProducts } = useProductsContext();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchProducts(`${products_url}${userid}/${props.location.state}`);
  }, [props.location.state]);

  return (
    <main style={{ marginTop: "10%", marginBottom: "5%" }}>
      <ProductLIst />
    </main>
  );
};

export default ProductPage;
