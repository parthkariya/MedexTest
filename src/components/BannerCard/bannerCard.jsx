import React from "react";
import "./bannerCard.css";
import { images } from "../../constants";
import { useHomeContext } from "../../context/home_context";

const bannerCard = (props) => {
  const bannerCard = props.bannerCard;

  return (
    <>
      {bannerCard && bannerCard !== undefined ? (
        <div className="overly_singlecard-wrapper">
          <div className="overly_singlecard-img_wrapper">
            <img src={bannerCard.image_full_path} alt="overly card img" />
          </div>
          <div className="overly_singlecard-product_info">
            <div className="product_info-heading">
              <h3>{bannerCard.name}</h3>
            </div>
            <div className="product_info-dis">
              {/* <p>{bannerCard.description} </p> */}
              <div dangerouslySetInnerHTML={{ __html: bannerCard.description }} />

            </div>
            {/* <div className="product_info-buynow">
              <h3>₹99</h3>
              <button className="buynow_btn">BUY NOW</button>
            </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default bannerCard;
