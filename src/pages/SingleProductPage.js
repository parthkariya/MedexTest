import React, { useEffect, useState } from "react";
import { images } from "../constants";
import "../container/SingleProduct/singleProduct";

import { AiOutlineShoppingCart } from "react-icons/ai";

import { FaBuilding } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";

import { GiChemicalDrop } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { single_product_url } from "../Utils/constatns";
import { useCartContext } from "../context/cart_context";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ProductCard, ProductImages } from "../components";

const SingleProductPage = (props) => {
  const { fetchSingleProduct, single_product } = useProductsContext();
  const { userid } = useUserContext();
  const { addToCartItem, cart, increase_qty, descrease_qty } = useCartContext();
  const [value, setValue] = React.useState("1");
  const [check, setCheck] = React.useState(false);
  const [redux_item, setReduxItem] = React.useState("");
  const [redux_index, setReduxIndex] = React.useState("");
  const [qty, setQty] = useState(1);
  const [isRefresh, setRefresh] = useState(false);
  const [offer_qty, setOfferQty] = useState(0);

  const { images } = single_product;

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = props.location.state;
    const user_id = localStorage.getItem("userid");
    if (user_id === "") {
      fetchSingleProduct(`${single_product_url}${id}/${0}`);
    } else {
      fetchSingleProduct(`${single_product_url}${id}/${userid}`);
    }
  }, [props.location.state]);

  useEffect(() => {}, [console.log("sellername", single_product)]);
  useEffect(() => {
    if (single_product || single_product !== undefined) {
      setQty(
        single_product.bonus_offer_get === 0 &&
          single_product.bonus_offer_buy === 0
          ? 1
          : Number(single_product.bonus_offer_buy) +
              Number(single_product.bonus_offer_get)
      );
      setOfferQty(
        Number(single_product.bonus_offer_buy) +
          Number(single_product.bonus_offer_get)
      );
    }
    if (cart.length > 0) {
      setCheck(cart.some((data) => data.id === single_product.id));
      setReduxItem(cart.find((data) => data.id === single_product.id));
      setReduxIndex(cart.findIndex((data) => data.id === single_product.id));
      setRefresh(!isRefresh);
    }
  }, [single_product, cart]);

  useEffect(() => {
    if (check) {
      console.log("----", redux_item.user_qty);
      setQty(redux_item.user_qty);
    } else {
      setQty(
        single_product.bonus_offer_get === 0 &&
          single_product.bonus_offer_buy === 0
          ? 1
          : Number(single_product.bonus_offer_buy) +
              Number(single_product.bonus_offer_get)
      );
      setOfferQty(
        Number(single_product.bonus_offer_buy) +
          Number(single_product.bonus_offer_get)
      );
    }
  }, [check]);

  useEffect(() => {
    if (check) {
      setQty(redux_item.user_qty);
    } else {
      setQty(
        single_product.bonus_offer_get === 0 &&
          single_product.bonus_offer_buy === 0
          ? 1
          : Number(single_product.bonus_offer_buy) +
              Number(single_product.bonus_offer_get)
      );
      setOfferQty(
        Number(single_product.bonus_offer_buy) +
          Number(single_product.bonus_offer_get)
      );
    }
  }, [isRefresh]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cartAddValue = async (item) => {
    const check = await cart.some(
      (data) => data.sellers.id || single_product.sellers.id
    );
    if (cart.length === 0 || check) {
      const data = {
        ...item,
        user_qty: qty,
        gstIncludePrice:
          Number(item.price) + Number(item.price * (Number(item.gst) / 100)),
      };
      const obj = data;
      addToCartItem(obj);
    } else {
      alert("At a time only one seller product add in cart");
    }
  };

  return (
    <div>
      {single_product === undefined || single_product === "" ? null : (
        <div className="productpage__wrapper main__section_padding02">
          <div className="productpage_photo_side_wrapper">
            <div className="productpage_img_wrapper">
              {/* <img
                src={single_product.image}
                alt=""
                className="singleproduct_img"
              /> */}
              <ProductImages images={images} />
            </div>

            <div className="productpage_photo_side_wrapper-text_wrapper">
              {/* <h4 className="singleproduct_item_dis">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
            quo!
          </h4> */}
              <div className="singleproduct_company_circle">
                {/* <p className="singleproduct_delivery">🚚 FREE SHIPPING</p> */}
              </div>
            </div>
          </div>

          <div className="productpage_dis_side_wrapper">
            <div className="sellername_wrap">
              {single_product.category.slice(1, 2).map((item, index) => {
                return <p className="brand_text">{item}</p>;
              })}
            </div>

            <h1 className="singleproduct_name base_heading_text">
              {single_product.name}
            </h1>

            {/* <div className="sellername_wrap">
              {single_product.sellers === null ? (
                <p>seller name</p>
              ) : (
                <Link
                  to={{
                    pathname: "/sellers",
                    state: {
                      seller_id: single_product.sellers.id,
                      seller_name: single_product.sellers.name,
                    },
                  }}
                  className="sellername_text">
                  {single_product.sellers.name}
                </Link>
              )}
            </div> */}

            <div className="singleproduct_price_addtocart_wrapper">
              <div className="singleproduct_price_wrap">
                <div className="singleproduct_twoprice_wrap">
                  <h2 className="singleproduct_price">
                    &#x20B9; {single_product.price}
                  </h2>
                  <p className="singleproduct_price_line">
                    (&#x20B9;{single_product.selling_price})
                  </p>
                </div>

                <p style={{ color: "red", marginTop: "-10px" }}>
                  *Excluding GST
                </p>

                <div className="delivered">
                  <p style={{ color: "darkcyan" }}>Delivered on </p>
                  <p>Tuesday, 11 July.</p>
                </div>
                <div className="sellerInfo">
                  {/* <br />  */}
                  <div className="seller_details">
                    <div style={{ display: "flex" }}>
                      <p style={{ fontSize: "16px", fontWeight: "700" }}>
                        Seller :
                      </p>

                      {/* <h6 style={{ paddingLeft: "2px" }}>
                        {single_product.sellers.name}
                      </h6> */}
                      <div className="sellername_wrap">
                        {single_product.sellers === null ? (
                          <p>seller name</p>
                        ) : (
                          <Link
                            to={{
                              pathname: "/sellers",
                              state: {
                                seller_id: single_product.sellers.id,
                                seller_name: single_product.sellers.name,
                              },
                            }}
                            className="sellername_text"
                          >
                            {single_product.sellers.name}
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="return-time-sec-flex">
                      {/* <img
                        src={images.return_exchange}
                        alt=""
                        className="rtn_exchange"
                      /> */}
                      <TbTruckReturn className="rtn_exchange" />
                      <b>7 Days Return or Replacement.</b>
                    </div>
                  </div>
                  {/* <div>
                    <img
                      src={images.return_exchange}
                      alt=""
                      className="rtn_exchange"
                    />
                  </div> */}
                  <div>
                    {/* <p>
                      <b>7 Days Return or Replacement.</b>
                    </p> */}
                  </div>
                </div>
                <ul>
                  <li>hello</li>
                  <li>hello</li>
                </ul>
                <div className="singleproduct_qty">
                  <p className="quantity_text">Quantity</p>
                  <div className="quantity_box">
                    <p className="qty_no">
                      <button
                        className="qty_plus"
                        onClick={() => {
                          if (qty > 1) {
                            if (check) {
                              if (offer_qty < qty)
                                descrease_qty(
                                  redux_index,
                                  single_product.bonus_offer_get === 0 &&
                                    single_product.bonus_offer_buy === 0
                                    ? 1
                                    : offer_qty
                                );
                              setRefresh(!isRefresh);
                            } else {
                              if (
                                single_product.bonus_offer_get === 0 &&
                                single_product.bonus_offer_buy === 0
                              ) {
                                if (offer_qty < qty) setQty(qty - 1);
                              } else {
                                if (offer_qty <= qty - offer_qty)
                                  setQty(qty - offer_qty);
                              }
                            }
                          }
                        }}
                      >
                        -
                      </button>
                      &nbsp;&nbsp;{qty}&nbsp;&nbsp;
                      <button
                        className="qty_plus"
                        onClick={() => {
                          if (qty < single_product.max_order_qty) {
                            if (check) {
                              if (
                                single_product.bonus_offer_get === 0 &&
                                single_product.bonus_offer_buy === 0
                              )
                                increase_qty(redux_index, 1);
                              else {
                                if (
                                  qty + offer_qty <
                                  single_product.max_order_qty
                                )
                                  increase_qty(redux_index, offer_qty);
                              }
                              setRefresh(!isRefresh);
                            } else if (
                              single_product.bonus_offer_get === 0 &&
                              single_product.bonus_offer_buy === 0
                            )
                              setQty(qty + 1);
                            else if (
                              qty + offer_qty <
                              single_product.max_order_qty
                            )
                              setQty(qty + offer_qty);
                          }
                        }}
                      >
                        +
                      </button>
                    </p>
                  </div>
                </div>
                <div className="pincode_status">
                  {/* <img src={images.location_icon} className="location_sp" /> */}
                  <IoLocationSharp className="location_sp" />
                  <input
                    placeholder="Enter pincode"
                    style={{ paddingLeft: "8px", paddingRight: "8px" }}
                  ></input>
                  <button type="submit" className="pincodebtn_sp">
                    Submit
                  </button>
                </div>
              </div>
              {!check ? (
                <Link
                  to={{ pathname: "/cart" }}
                  onClick={() => {
                    cartAddValue(single_product);
                  }}
                  className="singleproduct_addtocard_wrap"
                >
                  <AiOutlineShoppingCart className="singleproduct_addtocard_logo" />
                  <p className="singleproduct_addtocard_text">+ Add to cart</p>
                </Link>
              ) : null}
            </div>

            <Tabs
              TabIndicatorProps={{ style: { height: 5 } }}
              sx={{
                borderBottom: 1,
                borderBottomColor: "gray",
                marginBottom: 7,
                marginTop: 4,
              }}
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="basic tabs example"
              className="tabex"
            >
              <Tab
                label={
                  <span
                    className={
                      value === "1" ? "tab__labal-active" : "tab__labal"
                    }
                  >
                    PRODUCT DETAILS
                  </span>
                }
                value="1"
              />
              <Tab
                label={
                  <span
                    className={
                      value === "2" ? "tab__labal-active" : "tab__labal"
                    }
                  >
                    OTHER SELLERS
                  </span>
                }
                value="2"
              />
            </Tabs>

            <div className="productpage_base_wrapper02">
              {/* LOGOS SECTION START */}

              {value === "1" ? (
                <div className="singleproduct_logos_section">
                  {/* LOGO 01 */}
                  <Link
                    to={{
                      pathname: "/manufactures",
                      state: {
                        manu_id: single_product.manufactures.id,
                        manu_name: single_product.manufactures.manufacture_name,
                      },
                    }}
                  >
                    <div className="singlelogo_wrapper">
                      <div className="singlelogo_wrapper_logobox">
                        <FaBuilding className="singlelogo_wrapper_logo" />
                      </div>
                      <div className="singlelogo_wrapper_text">
                        <p
                          className="singlelogo_wrapper_name"
                          style={{ color: "#1864ab" }}
                        >
                          Manufacture
                        </p>
                        <p
                          className="singlelogo_wrapper_dis"
                          style={{ color: "#1971c2", fontWeight: 500 }}
                        >
                          {single_product.manufacture}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* LOGO 02 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaCalendarAlt className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">Expiry Date</p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.expiry_date}
                      </p>
                    </div>
                  </div>

                  {/* LOGO 03 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaFile className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">Type</p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.type}
                      </p>
                    </div>
                  </div>

                  {/* LOGO 04 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaArrowDown className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">
                        Minimum Order Quantity
                      </p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.min_order_qty}
                      </p>
                    </div>
                  </div>

                  {/* LOGO 05 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaArrowUp className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">
                        Maximum Order Quantity
                      </p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.max_order_qty}
                      </p>
                    </div>
                  </div>

                  {/* LOGO 06 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaFolder className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">
                        Product Category
                      </p>
                      {single_product.category.map((item, index) => {
                        return <p className="singlelogo_wrapper_dis">{item}</p>;
                      })}
                      {/* <p className="singlelogo_wrapper_dis">Others</p> */}
                    </div>
                  </div>

                  {/* LOGO 07 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaRupeeSign className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">Mrp</p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.mrp}
                      </p>
                    </div>
                  </div>

                  {/* LOGO 08 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaShoppingBasket className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">Gst</p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.gst}%
                      </p>
                    </div>
                  </div>

                  {/* LOGO 09 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <FaGlobeAmericas className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">
                        Country of Origin{" "}
                      </p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.country}
                      </p>
                    </div>
                  </div>

                  {/* LOGO 10 */}

                  <div className="singlelogo_wrapper">
                    <div className="singlelogo_wrapper_logobox">
                      <GiChemicalDrop className="singlelogo_wrapper_logo" />
                    </div>
                    <div className="singlelogo_wrapper_text">
                      <p className="singlelogo_wrapper_name">
                        Chemical Combination
                      </p>
                      <p className="singlelogo_wrapper_dis">
                        {single_product.compostion}
                      </p>
                    </div>
                  </div>

                  {/* LOGO 11 */}

                  {single_product.offer === "both" ||
                  single_product.discount_ptr.length > 0 ? (
                    <div className="singlelogo_wrapper">
                      <div className="singlelogo_wrapper_logobox">
                        <FaTag className="singlelogo_wrapper_logo" />
                      </div>
                      <div className="singlelogo_wrapper_text">
                        <p className="singlelogo_wrapper_name">
                          Discount on PTR
                        </p>
                        <p className="singlelogo_wrapper_dis">
                          {single_product.discount_ptr}%
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {/* LOGO 12 */}
                  {single_product.offer === "both" ||
                  single_product.bonus_offer_get.length > 0 ? (
                    <div className="singlelogo_wrapper">
                      <div className="singlelogo_wrapper_logobox">
                        <FaTag className="singlelogo_wrapper_logo" />
                      </div>
                      <div className="singlelogo_wrapper_text">
                        <p className="singlelogo_wrapper_name">Offer</p>
                        <p className="singlelogo_wrapper_dis">
                          Buy <strong>{single_product.bonus_offer_buy}</strong>{" "}
                          Get <strong>{single_product.bonus_offer_get}</strong>{" "}
                          Free
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : value === "2" ? (
                <div className="seller_product_wrap">
                  {single_product && single_product.otherseller.length > 0 ? (
                    single_product.otherseller.map((item) => {
                      return (
                        <div className="list_card_wrap">
                          <ProductCard product={item} />
                        </div>
                      );
                    })
                  ) : (
                    <p>Sorry, no other sellers found.</p>
                  )}
                </div>
              ) : null}

              {/* LOGOS SECTION END */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;

// import React from 'react'
// import { SingleProduct } from '../container'

// const SingleProductPage = () => {
//   return (
//     <main>
//       <SingleProduct />
//     </main>
//   )
// }

// export default SingleProductPage
