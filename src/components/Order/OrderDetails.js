import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useOrderContext } from "../../context/place_order_context";
import moment from "moment";
import { width } from "@mui/system";

const OrderDetails = ({ order_modal, setOrder_modal }) => {
  const { single_order_details } = useOrderContext();
  return (
    <main className={order_modal ? "show dialog" : " dialog "}>
      <div className="new_address_section">
        {single_order_details === {} ||
        single_order_details === undefined ||
        single_order_details === "" ? null : (
          <>
            <div className="main_container">
              <p className="od-title"> &nbsp; Order Details </p>

              <div className="od_sub_container_r1">
                <div className="od_sub_container flex1">
                  <div className="header_details">
                    <div className="third_input">
                      {/* <MdCancel onClick={() => setOrder_modal(false)} /> */}
                    </div>
                  </div>

                  <p className="od-info-title">Order Info :</p>

                  <hr className="od-divider" />

                  <p>
                    <b>Order Number</b> : {single_order_details.order_number}
                  </p>

                  <p>
                    <b>Payment Type</b> : {single_order_details.payment_type}
                  </p>

                  <p>
                    <span>
                      <b>Order Date</b> :
                    </span>{" "}
                    {moment(single_order_details.created_at).format(
                      "DD-MM-YYYY"
                    )}
                  </p>
                  <div className="third_input">
                    <p>
                      <b>Order Status</b> :{" "}
                      {single_order_details.order_status_id == "1"
                        ? "WAITING"
                        : single_order_details.order_status_id == "2"
                        ? "PREPARING"
                        : single_order_details.order_status_id == "3"
                        ? "ON THE WAY"
                        : single_order_details.order_status_id == "4"
                        ? "COMPLETED"
                        : single_order_details.order_status_id == "5"
                        ? "CANCELLED"
                        : single_order_details.order_status_id == "6"
                        ? "RETURNED"
                        : null}
                    </p>
                  </div>
                </div>
                <div className="od_sub_container flex3">
                  <div className="header_details">
                    <div className="">
                      {/* <MdCancel onClick={() => setOrder_modal(false)} /> */}
                    </div>
                  </div>

                  <p className="od-info-title">Customer Info :</p>

                  <hr className="od-divider" />

                  <div>
                    <p>
                      <b>Customer Name</b> :{" "}
                      {single_order_details.shipping_fullname}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>ID No : </b>
                      {single_order_details &&
                        single_order_details.address &&
                        single_order_details.address.address_id_no &&
                        single_order_details.address.address_id_no}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Mobile No : </b>
                      {single_order_details.shipping_mobile}
                    </p>
                  </div>

                  <div>
                    <p>
                      <b>Shipping Address : </b>
                      {single_order_details &&
                      single_order_details.address &&
                      single_order_details.address.address
                        ? single_order_details.address.address
                        : "Address Not Found"}{" "}
                      {single_order_details.shipping_pincode} ,
                      {single_order_details.shipping_city_name} ,
                      {single_order_details.shipping_state_name} ,
                      {single_order_details.shipping_country_name}
                    </p>
                  </div>

                  <div>
                    <p>
                      <b>GST Number : </b>
                      {single_order_details &&
                        single_order_details.address &&
                        single_order_details.address.gst_no &&
                        single_order_details.address.gst_no}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="od_sub_container od_cont_sroll">
                  <p className="od-info-title">Product Info :</p>

                  <hr className="od-divider" />

                  <div>
                    <p>
                      <div className="od-pro-sec">
                        <div className="od-pro-header">
                          <p className="flex-2">
                            <b>Product Name</b>
                          </p>
                          <p className="flex-1">
                            <b>Qty.</b>
                          </p>

                          <p className="flex-1">
                            <b>Price</b>
                          </p>
                        </div>
                        <hr className="od-divider"></hr>
                        {single_order_details &&
                        single_order_details.order_lines &&
                        single_order_details.order_lines.length > 0
                          ? single_order_details.order_lines.map(
                              (item, index) => {
                                return (
                                  <div className="od-pro-details">
                                    <p className="od-pro-name flex-2">
                                      {item.product_name}
                                    </p>
                                    <p className="flex-1">
                                      {item.total_quantity}
                                    </p>
                                    <p className="flex-1">
                                      &#x20B9;{item.price}
                                    </p>
                                  </div>
                                );
                              }
                            )
                          : null}
                      </div>
                    </p>
                  </div>
                </div>

                <div className="od_sub_container">
                  <div>
                    <div>
                      <p className="od-info-title">Order Summary :</p>
                      <hr className="od-divider" />{" "}
                      <p>
                        <b>Total Price</b> :{" "}
                        {Number(single_order_details.price) +
                          Number(single_order_details.taxable_price)}
                      </p>
                    </div>

                    {/* <div>
                      <p>
                        <b>Discount</b> :{" "}
                        {Number(single_order_details.taxable_price)}
                      </p>
                    </div> */}

                    {/* <div>
                      <p>
                        <b>Total Price</b> :{" "}
                        {Number(single_order_details.price)}
                      </p>
                    </div> */}

                    <div>
                      <p>
                        <b>Additional Shipping Charges</b> :{" "}
                        {Number(single_order_details.shipping_rate)}
                      </p>
                    </div>

                    <div>
                      <p>
                        <b>Deducted Wallet Amount</b> :{" "}
                        {Number(single_order_details.wallet_amount)}
                      </p>
                    </div>

                    <div>
                      <p>
                        <b>To Pay</b> :{" "}
                        {Number(single_order_details.total_price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_container_close">
              <MdCancel
                onClick={() => setOrder_modal(false)}
                style={{ cursor: "pointer", width: "1rem", height: "1rem" }}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default OrderDetails;
