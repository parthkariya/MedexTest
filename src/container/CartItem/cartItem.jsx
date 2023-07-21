import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { images } from "../../constants"
import { useCartContext } from "../../context/cart_context";
import { useUserContext } from "../../context/user_context";
import LoginComponent from "../../components/Login/LoginComponent";

import "./cartItem.css";
import { useProductsContext } from "../../context/products_context";

const CartItem = (props) => {
  const { isLogin, logoutUser, userid } = useUserContext();
  const [showscreen, setShowlogin] = React.useState(false);
  const { fetchSingleProduct, single_product } = useProductsContext();

  const {
    cart,
    removeCartItem,
    increase_qty,
    descrease_qty,
    setUser_qty,
    get_qty,
    checkout,
    total,
  } = useCartContext();

  useEffect(() => {
    // console.log("qty--->", get_qty);
  }, []);

  return (
    <section className="cart_item_main_wrapper">
      <div className="cart_item_base_wrapper">
        <div className="cart_item_section01">
          <p className="cart_item_main_heading">Your cart items</p>
        </div>

        {/* <p className="cart_item_simple_text">Product</p>
                <div className="cart_item_line"></div> */}

        <div className="space_bettwen d-flex">
          <div className="flex_left flex_left_price_text ">
            <p className="cart_item_simple_text">Item</p>
          </div>
          <div className="flex_right flex_right_price_text ">
            <p className="cart_item_simple_text">Price</p>
            <p className="cart_item_simple_text">Quantity</p>
            <p className="cart_item_simple_text">GST</p>
            {/* <p className="cart_item_simple_text">GST Price</p> */}
            <p className="cart_item_simple_text">Total</p>
          </div>
        </div>

        <div className="cart_item_line"></div>
        {cart && cart.length > 0 ? (
          cart.map((item, index) => {
            // if (item.length < 1) {
            //     return (
            //         <div className="fill_wrapper">
            //             <div className="fill_base">
            //                 <h2>Your Cart is empty</h2>
            //                 <Link to={{ pathname: '/ProductPage' }} className="btn">
            //                     fill it
            //                 </Link>
            //             </div>
            //         </div>
            //     );
            // }
            const offer_qty =
              Number(item.bonus_offer_buy) + Number(item.bonus_offer_get);
            return (
              <div>
                <div className="display_at_600">
                  <div style={{ border: "solid #e2e2e2 1px" }}>
                    <div className="img_sec">
                      <div>
                        <img src={item.image} alt="" className="pro_img" />
                      </div>
                      <div>
                        <div className="card_item_img_text_wrapper">
                          <Link
                            to={{
                              pathname: "/SingleProductPage",
                              state: item.id,
                            }}>
                            <p className="cart_item_name">{item.name}</p>
                          </Link>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              removeCartItem(item);
                              // console.log(item);
                            }}
                            className="cartitem_remove_link">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart-line"></div>
                    {/* <div className="price_sec">
                      <div>
                        <p>Price</p>
                      </div>
                      <div>
                        <p className="cart_item_simple_text">
                          &#x20B9; {item.price}
                        </p>
                      </div>
                    </div> */}
                    <div className="qty_sec">
                      <div className="name_title">
                        <p>Quantity</p>
                      </div>

                      <div
                        style={{
                          border: "solid #25ced1 2px",
                          width: "112px",
                          display: "flex",
                          justifyContent: "center",
                        }}>
                        <p className="qty_no">
                          <button
                            type="button"
                            className="qty_plus"
                            onClick={() => {
                              if (item.user_qty > item.min_order_qty) {
                                if (
                                  item.bonus_offer_get === 0 &&
                                  item.bonus_offer_buy === 0
                                ) {
                                  if (offer_qty < item.user_qty)
                                    descrease_qty(index, 1);
                                } else {
                                  if (offer_qty <= item.user_qty - offer_qty)
                                    descrease_qty(index, offer_qty);
                                }
                              }
                            }}>
                            -
                          </button>
                          {item.user_qty}
                          <button
                            type="button"
                            className="qty_plus"
                            onClick={() => {
                              if (item.user_qty < item.max_order_qty) {
                                if (
                                  item.bonus_offer_get === 0 &&
                                  item.bonus_offer_buy === 0
                                )
                                  increase_qty(index, 1);
                                else {
                                  if (
                                    item.user_qty + offer_qty <
                                    item.max_order_qty
                                  )
                                    increase_qty(index, offer_qty);
                                }
                              }
                            }}>
                            +
                          </button>
                        </p>
                      </div>
                    </div>

                    <div className="cart-line"></div>

                    <div className="price_sec">
                      <div className="name_title">
                        <p>Price</p>
                      </div>
                      <div>
                        <p className="cart_item_simple_text">
                          &#x20B9; {item.price}
                        </p>
                      </div>
                    </div>

                    <div className="cart-line"></div>

                    <div className="gst_sec">
                      <div className="name_title">
                        <p>GST</p>
                      </div>
                      <div>
                        <p className="cart_item_simple_text">
                          ({item.gst}%) &#x20B9;
                          {(
                            item.price *
                            (item.gst / 100) *
                            item.user_qty
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="cart-line"></div>

                    <div className="tot_sec">
                      <div className="name_title">
                        <p>Total</p>
                      </div>
                      <div>
                        <p className="cart_item_simple_text">
                          &#x20B9;
                          {Number(item.gstIncludePrice * item.user_qty).toFixed(
                            2
                          )}
                          {/* {(
                          item.price * item.user_qty +
                          item.price * (item.gst / 100) * item.user_qty
                        ).toFixed(2)} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart_item_section02">
                  <div className="section_02_flex01">
                    {/* <p className="cart_item_simple_text">Product</p>
                        <div className="cart_item_line"></div> */}

                    <div className="flex_left cart_img_flex_wrapper">
                      <img src={item.image} alt="" className="card_item_img" />
                      <div className="card_item_img_text_wrapper">
                        <Link
                          to={{
                            pathname: "/SingleProductPage",
                            state: item.id,
                          }}>
                          <p className="cart_item_name">{item.name}</p>
                        </Link>
                        <br />
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              removeCartItem(item);
                              // console.log(item);
                            }}
                            className="cartitem_remove_link">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="cart_item_line"></div> */}
                  </div>

                  <div className="section_02_flex02">
                    <div className="flex_right prices_text">
                      <p className="cart_item_simple_text">
                        &#x20B9; {item.price}
                      </p>
                      <div className="singleproduct_qty">
                        <div className="quantity_box">
                          <p className="qty_no">
                            <button
                              type="button"
                              className="qty_plus"
                              onClick={() => {
                                if (item.user_qty > item.min_order_qty) {
                                  if (
                                    item.bonus_offer_get === 0 &&
                                    item.bonus_offer_buy === 0
                                  ) {
                                    if (offer_qty < item.user_qty)
                                      descrease_qty(index, 1);
                                  } else {
                                    if (offer_qty <= item.user_qty - offer_qty)
                                      descrease_qty(index, offer_qty);
                                  }
                                }
                              }}>
                              -
                            </button>
                            {item.user_qty}
                            <button
                              type="button"
                              className="qty_plus"
                              onClick={() => {
                                if (item.user_qty < item.max_order_qty) {
                                  if (
                                    item.bonus_offer_get === 0 &&
                                    item.bonus_offer_buy === 0
                                  )
                                    increase_qty(index, 1);
                                  else {
                                    if (
                                      item.user_qty + offer_qty <
                                      item.max_order_qty
                                    )
                                      increase_qty(index, offer_qty);
                                  }
                                }
                              }}>
                              +
                            </button>
                          </p>
                        </div>
                      </div>
                      <p className="cart_item_simple_text">
                        ({item.gst}%) &nbsp; &#x20B9;
                        {(
                          item.price *
                          (item.gst / 100) *
                          item.user_qty
                        ).toFixed(2)}
                      </p>
                      {/* <p className="cart_item_simple_text"></p> */}
                      <p className="cart_item_simple_text">
                        &#x20B9;{" "}
                        {Number(item.gstIncludePrice * item.user_qty).toFixed(
                          2
                        )}
                        {/* {(
                          item.price * item.user_qty +
                          item.price * (item.gst / 100) * item.user_qty
                        ).toFixed(2)} */}
                      </p>
                    </div>

                    {/* <div className="cart_item_line"></div> */}
                  </div>
                </div>

                <div className="cart_item_line"></div>
              </div>
            );
          })
        ) : (
          <div className="fill_wrapper">
            <div className="fill_base">
              <h2>Your Cart is empty</h2>
              <Link to={{ pathname: "/" }} className="fill_btn">
                fill it
              </Link>
            </div>
          </div>
        )}

        {cart && cart.length > 0
          ? cart.slice(0, 1).map((item, index) => {
              return (
                <div className="cart_item_section03">
                  <div className="sub_total_wrap">
                    <div className="sub_total_wrap_text">
                      <p className="cart_item_simple_text">Sub-total</p>
                      <p className="cart_item_simple_text">
                        &#x20B9; {total.toFixed(2)}
                      </p>
                    </div>
                    <div className="sub_total_wrap_dis">
                      <p>Tax and shipping cost will be calculated later</p>
                    </div>
                  </div>
                  {/* <Link to={{ pathname: "/" }}>
                    <p className="back_to_shop">Back To Shopping</p>
                  </Link> */}
                  {isLogin ? (
                    <Link
                      className="check_out_btn"
                      to={{ pathname: "/CheckOutPage" }}>
                      Check-out
                    </Link>
                  ) : (
                    <Link
                      className="check_out_btn"
                      onClick={() => setShowlogin(true)}>
                      Check-out
                    </Link>
                  )}
                </div>
              );
            })
          : null}
        <div className="back_to_shop_section">
          <Link to={{ pathname: "/" }}>
            <p className="back_to_shop">Back To Shopping</p>
          </Link>
        </div>
      </div>

      <LoginComponent showscreen={showscreen} setShowlogin={setShowlogin} />
    </section>
  );
};

export default CartItem;
