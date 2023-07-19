import React, { useEffect, useState } from "react";
import { useOrderContext } from "../context/place_order_context";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import NewAddress from "../components/Add Address/AddAddress";
import Modal from "react-responsive-modal";
import "./Dashboard.css";

import { MdAddCircle, MdCancel } from "react-icons/md";
import {
  MdOutlineEditNote,
  MdOutlineDelete,
  MdDownloadForOffline,
} from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";
import { FaFileAlt } from "react-icons/fa";
import { isEditable } from "@testing-library/user-event/dist/utils";
import OrderDetails from "../components/Order/OrderDetails";
import { Link } from "react-router-dom";
import TicketDetails from "../container/TicketDetails";

const Dashboard = () => {
  window.scrollTo(0, 0);

  const [newAddress, setNewAddress] = React.useState(false);
  const { cart, total_amount, total } = useCartContext();
  const {
    getAddress,
    address_list,
    deleteAddress,
    getOrdersList,
    downloadInvocie,
    my_order_list,
    getSingleOrderDetails,
    cancelOrder,
  } = useOrderContext();
  const {
    logintoken,
    isLogin,
    logindata,

    getUserDetails,
    wallet_data,
    getWallet,
  } = useUserContext();
  console.log("login data log -->", logindata);

  const [_state, setStateAddress] = React.useState("");
  const [order_modal, setOrder_modal] = React.useState(false);
  const [ticket_modal, setTicket_modal] = React.useState(false);
  const [orderData, setOrder_data] = React.useState("");
  const [shiping_address_id, setAddress_Id] = useState("");

  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    getUserDetails(logintoken);
    getAddress(logintoken);
    getOrdersList(logintoken);
    getWallet(logintoken);
    cancelOrder(logintoken);
  }, []);

  const mDownloadInvoice = (mID) => {
    // console.log("MiD---->>", mID);
    var params = {
      order_number: mID,
    };
    downloadInvocie(params);
  };

  const cancel_Order = (coId) => {
    var params = {
      id: coId,
    };
    cancelOrder(params);
  };

  return (
    <>
      {isLogin ? (
        <div className="dashboard_wrapper">
          <div className="db_title">
            <p>Dashboard</p>
          </div>
          <div className="db_wrapper">
            <div className="db_profile">
              <div className="metadata_lbl">My Profile</div>

              <div className="metadata_divider"></div>
              <span>
                {logindata ? (
                  <div className="acc_wrapper">
                    <div className="first_col">
                      <lable className="acc_lable">
                        Name :{" "}
                        <lable className="acc_lable_val">
                          {logindata.name}
                        </lable>
                      </lable>
                      <lable className="acc_lable">
                        {" "}
                        firstname :{" "}
                        <lable className="acc_lable_val">
                          {logindata.first_name}
                        </lable>
                      </lable>
                      <lable className="acc_lable">
                        {" "}
                        Last Name :{" "}
                        <lable className="acc_lable_val">
                          {logindata.last_name}
                        </lable>
                      </lable>
                    </div>

                    <div className="acc_divider">
                      <span></span>
                    </div>
                    <div className="second_col">
                      <div className="email_col">
                        <lable className="acc_lable">
                          Email Id :{" "}
                          <lable className="acc_lable_val">
                            {logindata.email}
                          </lable>
                        </lable>
                      </div>
                      <div className="number_col">
                        <lable className="acc_lable">
                          Mobile Number :
                          <lable className="acc_lable_val">
                            {logindata.number}
                          </lable>
                        </lable>
                      </div>
                    </div>
                    <div className="acc_divider">
                      <span></span>
                    </div>
                    <div className="fourth_col">
                      {/* <div className="dob_col">
                    <lable className="acc_lable">DOB : </lable>
                    <lable className="acc_lable_val">{logindata.dob}</lable>
                  </div> */}

                      <div className="gender_col">
                        <lable className="acc_lable">company name </lable>
                        <lable className="acc_lable_val">
                          {logindata.company_name}
                        </lable>
                      </div>

                      <div className="gender_col">
                        <lable className="acc_lable">gstin no : </lable>
                        <lable className="acc_lable_val">
                          {logindata.gst_no}
                        </lable>
                      </div>

                      <div className="gender_col">
                        <lable className="acc_lable">drug_lia_no_20b : </lable>
                        <lable className="acc_lable_val">
                          {logindata.drug_lia_no_20b}
                        </lable>
                      </div>

                      <div className="gender_col">
                        <lable className="acc_lable">drug_lia_no_21b : </lable>
                        <lable className="acc_lable_val">
                          {logindata.drug_lia_no_21b}
                        </lable>
                      </div>

                      <div className="gender_col">
                        <lable className="acc_lable">fssai no : </lable>
                        <lable className="acc_lable_val">
                          {logindata.fssai_drug_lia_no}
                        </lable>
                      </div>
                    </div>

                    <div className="acc_divider">
                      <span></span>
                    </div>
                  </div>
                ) : null}
              </span>
            </div>

            {/* address tab */}
            <div className="db_address">
              <div className="metadata_lbl">My Address</div>
              <div className="metadata_divider"></div>
              <span>
                <div className="add_info">
                  {/* <p className="add_sub_title">Select Delivery Address</p>

              <button
                className="add_address_btn"
                onClick={() => setNewAddress(true)}
              >
                <MdAddCircle className="new_add_btn" />
                <p>Add New Delivery Address</p>
              </button> */}

                  <NewAddress
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                  />
                  <div className="add_cards_section">
                    {address_list && address_list.length > 0
                      ? address_list.map((item, index) => {
                          return (
                            <div className="add_card">
                              <div className="add_details">
                                <p className="add_type">
                                  {item.is_status === 1
                                    ? "Home"
                                    : item.is_status === 2
                                    ? "Office"
                                    : "Other"}
                                </p>
                                <p className="uname">{item.fullname}</p>
                                <p className="add">
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
                              {/* <div className="add_card_edit">
                            <MdOutlineDelete
                              className="edit_btn"
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
                </div>
              </span>
            </div>

            {/* wallte tab */}
            <div className="db_wallet">
              <div className="metadata_lbl">My Wallet</div>
              <div className="metadata_divider"></div>

              <span>
                <div className="wallet_card">
                  <div>
                    <GiWallet className="wallet_icn" />
                  </div>
                  <div className="wallet_content">
                    <div>
                      <p>
                        <h5>My Wallet Balance</h5>
                      </p>
                    </div>
                    <div>
                      <p>
                        <h3>Rs. {logindata ? logindata.wallet : 0}</h3>
                      </p>
                    </div>
                    <div>
                      <Link
                        className="tandc"
                        to={{
                          pathname: `/TermsConditions`,
                        }}>
                        Terms and Conditions
                      </Link>
                    </div>
                  </div>
                  <div>
                    {/* <button className="add_wallet_btn">
                  <h4>+</h4>
                </button> */}
                  </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                  <table className="wall_hist_tbl">
                    <tr>
                      <th>Order Id</th>
                      <th>Customer Name</th>
                      <th>Credit</th>
                      <th>Debit</th>
                      <th>Status</th>{" "}
                    </tr>
                    {wallet_data && wallet_data.length > 0
                      ? wallet_data.map((item, index) => {
                          return (
                            <tr>
                              <td>{item.order_number}</td>
                              <td>{item.customer_name}</td>
                              <td>
                                {item.is_status == "1"
                                  ? item.amount
                                  : item.is_status == "2"
                                  ? "-"
                                  : item.is_status == "3"
                                  ? "-"
                                  : null}
                              </td>
                              <td>
                                {" "}
                                {item.is_status == "1"
                                  ? "-"
                                  : item.is_status == "2"
                                  ? item.amount
                                  : item.is_status == "3"
                                  ? "-"
                                  : null}
                              </td>
                              <td>
                                {item.is_status == "1"
                                  ? "Converted"
                                  : item.is_status == "2"
                                  ? "Used"
                                  : item.is_status == "3"
                                  ? "Return"
                                  : null}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </table>
                </div>
              </span>
            </div>

            {/* order tab */}
            <div className="db_orders">
              <div className="metadata_lbl">My Orders</div>
              <div className="metadata_divider"></div>

              <span>
                <table className="order_table order_hist_tbl">
                  <tr>
                    <th>Order Date</th>
                    <th>Order Id</th>
                    <th>Order Total</th>
                    <th>Order Status</th>
                    <th>Action</th>
                  </tr>
                  {my_order_list && my_order_list.length > 0
                    ? my_order_list.map((item, index) => {
                        return (
                          <tr>
                            <td>{item.order_date}</td>
                            <td>{item.order_number}</td>
                            <td>{item.price}</td>
                            <td>
                              {item.order_status_id == "1"
                                ? "WAITING"
                                : item.order_status_id == "2"
                                ? "PREPARING"
                                : item.order_status_id == "3"
                                ? "ON THE WAY"
                                : item.order_status_id == "4"
                                ? "COMPLETED"
                                : item.order_status_id == "5"
                                ? "CANCELLED"
                                : item.order_status_id == "6"
                                ? "RETURNED"
                                : null}
                            </td>
                            <td className="action_val_cell">
                              <button
                                className="ticket_details_btn"
                                onClick={() => {
                                  setTicket_modal(true);
                                  getSingleOrderDetails(item.id, logintoken);
                                }}>
                                <IoTicket className="ticket_details_btn" />
                              </button>

                              <button
                                className="action_view_btn"
                                onClick={() => {
                                  setOrder_modal(true);
                                  getSingleOrderDetails(item.id, logintoken);
                                }}>
                                <FaFileAlt className="action_view_btn" />
                              </button>

                              <a
                                href="javasript:void(0);"
                                title="Download Invoice"
                                className="action_val_btn"
                                onClick={() => mDownloadInvoice(item.id)}>
                                <MdDownloadForOffline className="action_download_btn" />
                              </a>
                              {item.order_status_id == "1" ? (
                                <button
                                  onClick={() => {
                                    cancel_Order(item.id);
                                  }}
                                  className="action_val_btn">
                                  <MdCancel className="action_cancel_btn" />
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </table>
              </span>
            </div>
          </div>

          <NewAddress
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            isEdit={isEdit}
            setEdit={setEdit}
            editData={editData}
          />

          <OrderDetails
            order_modal={order_modal}
            setOrder_modal={setOrder_modal}
          />

          <TicketDetails
            ticket_modal={ticket_modal}
            setTicket_modal={setTicket_modal}
          />
        </div>
      ) : (
        <div className="dashboard_wrapper">
          <div className="db_title">
            <p>Please Login for Dashboard. </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
