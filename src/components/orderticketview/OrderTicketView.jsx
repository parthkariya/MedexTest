import React from "react";
import "./OrderTicketView.css";
import images from "../../constants/images";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { accept_header, order_ticket_view } from "../../Utils/constatns";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const OrderTicketView = () => {
  const [viewticketdata, setViewTicketData] = useState([]);
  const [loading, SetLoading] = useState(false);

  const TicketViewApi = async () => {
    SetLoading(true);
    let userid = localStorage.getItem("token");
    console.log("token is", userid);

    const formdata = new FormData();

    console.log("ticket formdata is", formdata);

    axios
      .post(order_ticket_view, formdata, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + JSON.parse(userid),
        },
      })
      .then((res) => {
        console.log("ticket data", res.data);
        if (res.data.success == 1) {
          SetLoading(false);
          setViewTicketData(res.data.record);
        } else {
          null;
          SetLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        SetLoading(false);
      });
  };

  useEffect(() => {
    TicketViewApi();
  }, []);
  return (
    <>
      {}
      <div className="inq-card-sec">
        <div className="inq-card-con">
          <p className="ticket-viw-head">Tickets</p>
          {viewticketdata && viewticketdata.length > 0
            ? viewticketdata.map((item) => {
                return (
                  <div className="inq-card-main">
                    {" "}
                    <div className="inq-card-imgbox">
                      <img
                        // src={
                        //     item.image_full_path !== "" ? item.image_full_path : images.user
                        // }
                        src={
                          item.image_full_path !== ""
                            ? item.image_full_path
                            : images.noimage
                        }
                        alt="inquiry Image"
                        className="inq-card-img"
                      />
                    </div>
                    <div className="inq-card-content">
                      <div className="field-flex">
                        <p className="inq-card-txt">Product Name:</p>
                        <span className="inq-card-txt-inner">
                          {/* {item.first_name && item.first_name}{" "}
                            {item.last_name && item.last_name} */}
                          {item.product_name === null ||
                          item.product_name === "undefined" ||
                          item.product_name === ""
                            ? ""
                            : item.product_name}
                        </span>
                      </div>
                      <div className="field-flex">
                        <p className="inq-card-txt">Subject: </p>
                        <span className="inq-card-txt-inner">
                          {/* <span>{item.email && item.email}</span> */}
                          {item.subject === null ||
                          item.subject === "undefined" ||
                          item.subject === ""
                            ? ""
                            : item.subject}
                        </span>
                      </div>
                      <div className="field-flex">
                        <p className="inq-card-txt">Product Description: </p>
                        <span className="inq-card-txt-inner">
                          {item.problem_description === null ||
                          item.problem_description === "undefined" ||
                          item.problem_description === ""
                            ? ""
                            : item.problem_description}
                        </span>
                      </div>
                    </div>
                    {/* <button className="btn-inq-card" onClick={() => deleteInquery()}>
                            <MdOutlineDeleteOutline className="inq-card-icon" />
                        </button> */}
                  </div>
                );
              })
            : null}{" "}
        </div>
      </div>
    </>
  );
};

export default OrderTicketView;
