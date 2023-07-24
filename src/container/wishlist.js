import React, { useEffect, useState } from "react";
import { images } from "../constants";
import {
  accept_header,
  add_wishlist_url,
  get_wishlist_url,
} from "../Utils/constatns";
import axios from "axios";

const wishlist = () => {
  const [loading, SetLoading] = useState(false);
  const [wishlistdata, setWishlistdata] = useState();
  const [wishlistcalling2, setWishlistcalling2] = useState(2);

  const getWishlist = async () => {
    SetLoading(true);
    let userid = localStorage.getItem("token");
    console.log("token is", userid);

    const formdata = new FormData();

    // console.log("ticket formdata is", formdata);

    axios
      .get(get_wishlist_url, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + JSON.parse(userid),
        },
      })
      .then((res) => {
        console.log("ticket data", res.data);
        if (res.data.success == 1) {
          SetLoading(false);
          setWishlistdata(res.data.data);
          // console.log("wishlist data is", wishlistdata);
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
    getWishlist();
  }, []);

  // delete wishlist

  const deleteWishlist = (productid) => {
    SetLoading(true);
    let userid = localStorage.getItem("token");
    console.log("token is", userid);

    const formdata = new FormData();
    formdata.append("product_id", productid);
    formdata.append("calling", wishlistcalling2);

    console.log("add wishlist formdata is", formdata);

    axios
      .post(add_wishlist_url, formdata, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + JSON.parse(userid),
        },
      })
      .then((res) => {
        console.log("ticket data", res.data);
        if (res.data.success == 1) {
          SetLoading(false);
          // setTicket_modal(false);
          getWishlist();
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

  return (
    <main>
      <div>
        <div className="sc_name">Home / Wishlist</div>

        <div className="content">
          <div className="wishlist_info">
            <div className="title_wishlist">
              <div className="item_title">
                <h5>Item</h5>
              </div>
              <div className="price_title">
                <h5>Price</h5>
              </div>
            </div>
            <div className="wishlist-line"></div>
            {/* <div className="wishlist_info">
              <img src="logo192.png" className="img_wishlist" />
              <div>
                <h5>GEPRIDE M 2MG FORTE TABLET 10S</h5>
                <button>DETAILS</button>
              </div>
              <div className="price_wishlist">
                <h4>₹716</h4>
              </div>
              <div className="line_wishlist"></div>
            {/* </div> */}

            {wishlistdata && wishlistdata.length > 0
              ? wishlistdata.map((item) => {
                  return (
                    <div className="Products">
                      <div className="info_one">
                        <div>
                          <img src={item.image} className="img_wishlist" />
                        </div>
                        <div style={{ maxWidth: "230px" }}>
                          <h5>{item.name}</h5>
                          {/* <button className="wishlist-btn">DETAILS</button> */}
                        </div>
                      </div>
                      <div>
                        <h4>{item.mrp}</h4>
                      </div>
                      <div
                        onClick={() => deleteWishlist(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={images.delete_btn}
                          className="delete_wishlist"
                        />
                      </div>
                    </div>
                  );
                })
              : null}
          </div>

          {/*  */}
          <div className="resp-wishlist-flex">
            {wishlistdata && wishlistdata.length > 0
              ? wishlistdata.map((item) => {
                  return (
                    <div className="main_div">
                      <div className="box_one">
                        <div>
                          <img src={item.image} className="img_wishlist" />
                        </div>
                        <div>
                          <h5 className="wishlist-desc">{item.name}</h5>
                          {/* <button className="wishlist-btn">Details</button> */}
                        </div>
                      </div>
                      <div>
                        <h4 className="wishlist-price">{item.mrp}</h4>
                      </div>
                      <div
                        onClick={() => deleteWishlist(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={images.delete_btn}
                          className="delete_wishlist"
                        />
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </main>
  );
};

export default wishlist;
