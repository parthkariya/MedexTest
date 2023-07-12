import React from "react";
import { images } from "../constants";

const wishlist = () => {
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
            <div className="Products">
              <div className="info_one">
                <div>
                  <img src="logo192.png" className="img_wishlist" />
                </div>
                <div>
                  <h5>GEPRIDE M 2MG FORTE TABLET 10S</h5>
                  <button className="wishlist-btn">DETAILS</button>
                </div>
              </div>
              <div>
                <h4>₹716</h4>
              </div>
              <div>
                <img src={images.delete_btn} className="delete_wishlist" />
              </div>
            </div>
          </div>

          {/*  */}

          <div className="main_div">
            <div className="box_one">
              <div>
                <img src="logo192.png" className="img_wishlist" />
              </div>
              <div>
                <h5 className="wishlist-desc">
                  GEPRIDE M 2MG FORTE TABLET 10S
                </h5>
                <button className="wishlist-btn">Details</button>
              </div>
            </div>
            <div>
              <h4 className="wishlist-price">₹716</h4>
            </div>
            <div>
              <img src={images.delete_btn} className="delete_wishlist" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default wishlist;
