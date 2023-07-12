import React, { useEffect } from "react";
import { ProductCard } from "../components";
import "../container/productList/ProductList";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";

const Search = (props) => {
  const { userid } = useUserContext();
  const { searchProducts, products } = useProductsContext();

  useEffect(() => {
    const formData = new FormData();
    formData.append("search", props.location.state);
    formData.append("customer_id", userid);
    searchProducts(formData);
  }, [props.location.state]);

  return (
    <div className="product_list_main_wrapper">
      <div className="product_list_base_wrap">
        <div className="list_container">
          {products && products.length
            ? products.map((item) => {
                return (
                  <div className="list_card_wrap">
                    <ProductCard product={item} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
