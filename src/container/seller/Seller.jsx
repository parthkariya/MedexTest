import React, { useEffect, useState, useMemo } from "react";
import "./Seller.css";
import { ProductCard } from "../../components";
import { useHomeContext } from "../../context/home_context";
import { useProductsContext } from "../../context/products_context";
import axios from "axios";
import { Reviews } from "@mui/icons-material";

const Seller = (props) => {
  const { fetchSingleProduct, single_product } = useProductsContext();
  const { sellerProducts } = useProductsContext();
  const [get_array, setarray] = useState([]);
  const [product_array, setProductArray] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    setProductArray(sellerProducts)
  }, [sellerProducts])

  useEffect(() => {
    // console.log("=======", props);
    categories();
  }, []);

  const categories = () => {
    var Token = localStorage.getItem("token");
    axios
      .get("https://applified.co.in/medex/api/v1/get-category", {
        headers: {
          Accept: "application/x.medex.v1+json",
          Authorization: "Bearer" + JSON.parse(Token),
        },
      })
      .then((res) => {
        // console.log("respons--->>", res.data);
        setarray(res.data.records);
      })
      .catch((err) => {
        console.log("err", JSON.stringify(err, null, 2));
      });
  };


  function getFilteredList() {
    if (!selectedCategory) {
      return categories;
    }
    return product_array.filter((item) => item.category === selectedCategory);
  }

  // Avoid duplicate function calls with useMemo
  // var filteredList = useMemo(getFilteredList, [selectedCategory, categories]);

  function handleCategoryChange(event) {
    console.log("----", event.target.value)
    setSelectedCategory(event.target.value);
    if (event.target.value === "")
      setProductArray(sellerProducts)
    else {
      var data = sellerProducts.filter((item) => item.category.some(val => val === event.target.value))
      setProductArray(data)
    }
  }


  return (
    <div className="seller_main_wrapper">
      <div className="seller_base_wrapper">
        <div className="seller_headind_wrap">
          <div className="seller_name_wrap">
            <h2 className="seller_name">{props.seller_name}</h2>
          </div>
        </div>

        <div className="seller_body_wrap">
          <div>
            <div className="seller_products_filter">
              <form>
                <select
                  name="categories"
                  id="categories"
                  onChange={handleCategoryChange}
                >
                  <option value="" selected>
                    All
                  </option>
                  {get_array.map((item, index) => {
                    return (
                      <>
                        {item.items.map((item, index) => {
                          return (
                            <option className="singlelogo_wrapper_dis">
                              {item.name}
                            </option>
                          );
                        })}
                      </>
                    );
                  })}
                </select>
              </form>
            </div>
            <div className="seller_product_wrap">
              {product_array.map((item) => {
                return (
                  <div className="list_card_wrap">
                    <ProductCard product={item} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="seller_salles_wrap">
            <p className="sales_stats_title">Sales Statistics</p>
            <div className="sales_stats_cards">
              <div className="sales_stats">
                <p className="product_stats">
                  {" "}
                  {sellerProducts.length} Products
                </p>
              </div>
              <div className="sales_stats">
                <p className="review_stats"> 05 Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
