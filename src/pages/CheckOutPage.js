import React, { useEffect, useState } from "react";
import { components } from "react-select";
import { useParams, useHistory } from "react-router-dom";

import NewAddress from "../components/Add Address/AddAddress";

import { MdAddCircle } from "react-icons/md";
import { MdOutlineEditNote, MdOutlineDelete } from "react-icons/md";

import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { useOrderContext } from "../context/place_order_context";

import { formatPrice } from "../Utils/helpers";
import { mobileValidate, emailValidate } from "../Utils/helpers";
import place_order_context from "../../src/context/place_order_context";
import Notification from "../Utils/Notification";

import "./CheckOutPage.css";
import { Link } from "react-router-dom";

const CheckOutPage = () => {
  const history = useHistory();

  const { cart, total_amount, total } = useCartContext();
  const { getAddress, address_list, deleteAddress } = useOrderContext();
  const { logintoken, isLogin, logindata, getUserDetails } = useUserContext();
  const { setOrder, order_data, login_loading, setOrderGuest } =
    useOrderContext();

  const [_state, setStateAddress] = React.useState("");
  const [payment_type, setPaymentType] = React.useState("cod");
  const [newAddress, setNewAddress] = React.useState(false);
  const [shiping_address_id, setAddress_Id] = useState("");

  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState("");
  const [isChaked, setIschecked] = useState(true);
  const [selectedOption, setSelectionOption] = useState("Wallet");

  const [payment_tab, setPaymentTab] = useState(1);
  const [other_payment_type, setOtherPaymentType] = React.useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

  // useEffect(() => {
  //   console.log("address_list", address_list[0].id);
  // }, []);

  useEffect(() => {
    getAddress(logintoken);
  }, [logintoken]);

  useEffect(() => {
    if (logindata.wallet == 0) {
      setIschecked(false);
      setSelectionOption("");
    }
  }, [logindata]);

  const place_order = async () => {
    if (cart.length == 0) {
      Notification("error", "Error!", "Please select product!");
      return;
    }
    if (payment_tab === "") {
      Notification("error", "Error!", "Please select payment type!");
      return;
    }
    if (payment_tab === 2 && other_payment_type === "") {
      Notification("error", "Error!", "Please select one payment!");
      return;
    }
    if (payment_tab === 2 && amount === "") {
      Notification("error", "Error!", "Please enter amount");
      return;
    }
    if (payment_tab === 2 && date === "") {
      Notification("error", "Error!", "Please select date");
      return;
    }
    if (payment_tab === 2 && details === "") {
      Notification("error", "Error!", "Please enter transaction detail");
      return;
    }

    if (logindata.wallet < total && isChaked && selectedOption == "Wallet") {
      Notification("error", "Error!", "Choose other option to pay");
      return;
    }

    let formData = new FormData(); //formdata object
    if (payment_tab === 2) {
      formData.append("payment_type", "others");
      formData.append("others_type", other_payment_type);
      formData.append("others_amount", amount);
      formData.append("others_trans", details);
      formData.append("others_date", date);
    } else {
      formData.append(`payment_type`, payment_type);
      if (isChaked) formData.append("is_wallet", 1);
      if (isChaked) {
        if (logindata.wallet < total) {
          formData.append("wallet_amount_to_use", logindata.wallet);
        } else {
          formData.append("wallet_amount_to_use", total);
        }
      }
    }
    formData.append(`shipping_address_id`, address_list[0].id);
    formData.append(`billing_address_id`, address_list[0].id);
    formData.append(`currency`, "INR");
    formData.append(`gst_no`, "test");

    for (var i = 0; i < cart.length; i++) {
      formData.append("product_id[" + i + "]", cart[i].id);
      formData.append("main_price[" + i + "]", cart[i].selling_price);
      formData.append("price[" + i + "]", cart[i].price);
      formData.append("quantity[" + i + "]", cart[i].user_qty);
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    var order_data = await setOrder(formData, logintoken);
    if (order_data.success === 1) {
      Notification("success", "Success!", order_data.message + "");
      await localStorage.removeItem("cart");
      await localStorage.removeItem("total");
      await getUserDetails(logintoken);
      await history.push("/Dashboard");
      window.location.reload();
    } else {
      Notification("error", "Error!", order_data.message + "");
    }
  };

  const handleChangeWallet = async () => {
    await setIschecked(!isChaked);
    await setSelectionOption(isChaked ? "Wallet" : "");
  };

  return (
    <>
      <main className="checkout_wrapper">
        <div class="contact_info">
          <p className="contact_title">Select Delivery Address</p>
          {/* <button class="add_address" onClick={() => setNewAddress(true)}>
            <MdAddCircle className="add_new_btn" />
            <p>Add New Delivery Address</p>
          </button> */}
          <NewAddress
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            isEdit={isEdit}
            setEdit={setEdit}
            editData={editData}
          />
          <div className="adddress_cards_section">
            {address_list && address_list.length > 0
              ? address_list.map((item, index) => {
                  return (
                    <div className="address_card">
                      <div className="add_details">
                        <p className="address_type">
                          {item.is_status === 1
                            ? "Home"
                            : item.is_status === 2
                            ? "Office"
                            : "Other"}
                        </p>
                        <p className="username">{item.fullname}</p>
                        <p className="address">
                          {item.address},{item.country_name},{" "}
                          {item.country_name} - {item.pincode}
                        </p>

                        {/* <button
                          className="address_card_btn"
                          style={
                            item.id === shiping_address_id
                              ? { backgroundColor: "green" }
                              : {}
                          }
                          onClick={() => setAddress_Id(item.id)}
                        >
                          Deliver Here
                        </button> */}
                      </div>
                      {/* <div className="address_card_edit">
                        <MdOutlineDelete
                          className="add_edit_btn"
                          onClick={() => deleteAddress(item.id)}
                        />
                        <MdOutlineEditNote
                          className="add_edit_btn"
                          onClick={() => {
                            setNewAddress(true);
                            setEdit(true);
                            setEditData(item);
                          }}
                        />
                      </div> */}
                    </div>
                  );
                })
              : null}
          </div>

          <div
            className="promo"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <input
              placeholder="Enter promocode"
              style={{ paddingLeft: "8px", paddingRight: "8px" }}
            ></input>
            <button className="address_card_btn">Apply</button>
          </div>
        </div>
        {/* ------------------------------ */}
        <div className="checkout_section">
          <div class="checkout_card">
            <div className="pre_data">
              <div className="meta_data">
                <p>Product</p>
                <hr></hr>
              </div>
              <div className="product_name">
                {cart.map((item) => {
                  return <p className="pn_lg_wrap">{item.name}</p>;
                })}
                <hr></hr>
              </div>
              <div className="shipping_pre">
                <p>Subtotal</p>
                {/* <p>Shipping</p> */}
                <div>&nbsp;</div>
                {/* <hr></hr> */}
              </div>
              <div className="grand_total_pre">
                <p>Total</p>
              </div>
            </div>
            {/* ----------------------------------- */}
            <div className="post_data">
              <div className="meta_data">
                <p>Total</p>
                <hr></hr>
              </div>
              <div className="product_name">
                {cart.map((item) => {
                  return (
                    <p>
                      {formatPrice(
                        item.price * item.user_qty +
                          item.price * (item.gst / 100) * item.user_qty
                      )}
                    </p>
                  );
                })}
                <hr></hr>
              </div>
              <div className="shipping_post">
                <p className="sub_price"> {formatPrice(total)}</p>
                {/* <div>
                  <input type="checkbox" />
                  <lable className="shipping_opt">Free Shipping</lable>
                </div> */}
                <div>
                  {/* <input type="checkbox" />
                  <lable className="shipping_opt">Local Pickup</lable> */}
                </div>
                {/* <hr></hr> */}
              </div>
              <div className="grand_total_post">
                <p className="tot_price">{formatPrice(total)}</p>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          <div class="checkout_mcard">
            <div className="first_row">
              <p>Product</p>
              <p>Total</p>
            </div>
            <hr />
            <div className="second_row product_name">
              <div>
                {cart.map((item) => {
                  return <p className="pn_wrap">{item.name}</p>;
                })}
              </div>

              <div>
                {cart.map((item) => {
                  return <p>{formatPrice(item.price)}</p>;
                })}
              </div>
            </div>
            <hr />

            <div className="third_row">
              <div className="subtotal">
                <p>Subtotal</p>
                <p> {formatPrice(total_amount)}</p>
              </div>
              <div className="shipping">
                <p>Shipping</p>
                <div>
                  <div>
                    <input type="checkbox" />
                    <lable className="shipping_opt">Free Shipping</lable>
                  </div>
                  <div>
                    <input type="checkbox" />
                    <lable className="shipping_opt">Local Pickup</lable>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="fourth_row">
              <p>Total</p>
              <p>{formatPrice(total_amount)}</p>
            </div>
          </div>
          {/* ------------------------------------------------------------ */}

          <div className="payment_section">
            {/* <form> */}
            {/* <div className="rpay">
                <input
                  name="payment"
                  type="radio"
                  id="razorpay"
                  value="online"
                  onChange={(val) => setPaymentType(val.target.value)}
                />

                <lable>Razorpay</lable>
              </div> */}

            <div id="tsum-tabs">
              <div>
                {/* <input id="tab1" type="radio" name="tabs" checked />
                <label for="tab1">Wallet</label>

                <input id="tab2" type="radio" name="tabs" />
                <label for="tab2">Other Method</label> */}

                <Link
                  id="tab1"
                  name="tabs"
                  onClick={() => {
                    setPaymentTab(1);
                    setIschecked(true);
                    setSelectionOption("Wallet");
                  }}
                >
                  <label
                    for="tab1"
                    style={{ color: payment_tab === 1 ? "#22b8cf" : "" }}
                  >
                    Wallet
                  </label>
                </Link>

                <Link
                  id="tab2"
                  name="tabs"
                  onClick={() => {
                    setPaymentTab(2);
                    setIschecked(false);
                    setSelectionOption("");
                  }}
                >
                  <label
                    for="tab2"
                    style={{ color: payment_tab === 2 ? "#22b8cf" : "" }}
                  >
                    Other Method
                  </label>
                </Link>

                {/* <section id="content1"> */}
                {payment_tab === 1 ? (
                  <div className="wallet_bal">
                    <input
                      id="Paytm"
                      type="checkbox"
                      class="checkbox"
                      value=""
                      defaultChecked={isChaked}
                      onChange={() => handleChangeWallet()}
                    />
                    <lable class="wallet_name">
                      Wallet ( Balance :
                      <strong> Rs. {logindata ? logindata.wallet : 0}</strong>)
                    </lable>
                  </div>
                ) : payment_tab === 2 ? (
                  // {/* </section> */}
                  // {/* <section id="content2"> */}

                  <div className="om-payment-form">
                    <div className="om-paymnt-type">
                      <div className="pty-1">
                        <input
                          id="pty-1"
                          name="pty"
                          type="radio"
                          onClick={() => setOtherPaymentType("cheque")}
                        ></input>
                        <lable for="pty-1">Cheque</lable>
                      </div>
                      <div className="pty-2">
                        <input
                          id="pty-2"
                          name="pty"
                          type="radio"
                          onClick={() => setOtherPaymentType("neft")}
                        ></input>
                        <lable for="pty-2">NEFT</lable>
                      </div>
                      <div className="pty-3">
                        <input
                          id="pty-3"
                          name="pty"
                          type="radio"
                          onClick={() => setOtherPaymentType("imps")}
                        ></input>
                        <lable for="pty-3">IMPS</lable>
                      </div>
                      <div className="pty-4">
                        <input
                          id="pty-4"
                          name="pty"
                          type="radio"
                          onClick={() => setOtherPaymentType("cashdeposit")}
                        ></input>
                        <lable for="pty-4">Cash Deposit</lable>
                      </div>
                      <div className="pty-5">
                        <input
                          id="pty-5"
                          name="pty"
                          type="radio"
                          onClick={() => setOtherPaymentType("cashdeposit")}
                        ></input>
                        <lable for="pty-4">UPI</lable>
                      </div>
                    </div>

                    <div className="om-payment-details">
                      <div className="inpt-1">
                        <lable for="inpt-1"> Amount :</lable>
                        <input
                          id="inpt-1"
                          type="text"
                          placeholder="Amount"
                          onChange={(val) => setAmount(val.target.value)}
                        ></input>
                      </div>
                      <div className="inpt-2">
                        <lable for="inpt-2"> Date :</lable>
                        <input
                          id="inpt-2"
                          type="date"
                          onChange={(val) => setDate(val.target.value)}
                        ></input>
                      </div>
                      <div className="inpt-3">
                        <lable for="inpt-3"> Transaction Detail :</lable>
                        <input
                          id="inpt-3"
                          type="text"
                          placeholder="Transaction Detail"
                          onChange={(val) => setDetails(val.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                ) : null}
                {/* </section> */}
              </div>
            </div>

            {/* <div className="cod">
              <input
                name="payment"
                type="radio"
                id="cod"
                value="cod"
                checked
                onChange={(val) => setPaymentType(val.target.value)}
              />
              <lable>Cash On Delivery</lable>
            </div> */}
            <button
              type="submit"
              href="javascript:void(0)"
              className="co_login_btn"
              onClick={() => {
                // if (isLogin) {
                //   place_order();
                //   Notification("error", "Error!", "Please login");
                if (isLogin) {
                  place_order();
                } else {
                  Notification("error", "Error!", "Please login");
                }
              }}
            >
              PLACE ORDER
            </button>
            {/* </form> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckOutPage;
