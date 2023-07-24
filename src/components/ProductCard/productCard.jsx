// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { images } from "../../constants";
// import { useCartContext } from "../../context/cart_context";
// import "./productCard.css";

// const ProductCard = (props) => {
//   const product = props.product;
//   const { addToCartItem, cart } = useCartContext();
//   const [value, setValue] = React.useState("1");
//   const [check, setCheck] = React.useState(false);
//   const [redux_item, setReduxItem] = React.useState("");
//   const [redux_index, setReduxIndex] = React.useState("");
//   const [qty, setQty] = useState(1);
//   const [isRefresh, setRefresh] = useState(false);
//   const [offer_qty, setOfferQty] = useState(0);

//   useEffect(() => {
//     if (product || product !== undefined) {
//       setQty(
//         product.bonus_offer_get === 0 && product.bonus_offer_buy === 0
//           ? 1
//           : Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
//       );
//       setOfferQty(
//         Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
//       );
//     }
//     if (cart.length > 0) {
//       setCheck(cart.some((data) => data.id === product.id));
//       setReduxItem(cart.find((data) => data.id === product.id));
//       setReduxIndex(cart.findIndex((data) => data.id === product.id));
//     }
//   }, [props.product, cart]);

//   useEffect(() => {
//     if (check) {
//       setQty(redux_item.user_qty);
//     } else {
//       setQty(
//         product.bonus_offer_get === 0 && product.bonus_offer_buy === 0
//           ? 1
//           : Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
//       );
//       setOfferQty(
//         Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
//       );
//     }
//   }, [check]);

//   useEffect(() => {
//     if (check) {
//       setQty(redux_item.user_qty);
//     } else {
//       setQty(
//         product.bonus_offer_get === 0 && product.bonus_offer_buy === 0
//           ? 1
//           : Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
//       );
//       setOfferQty(
//         Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
//       );
//     }
//   }, [isRefresh]);

//   const cartAddValue = async (item) => {
//     const check = await cart.some(
//       (data) => data.sellers.id === product.sellers.id
//     );
//     if (cart.length === 0 || check) {
//       const data = {
//         ...item,
//         user_qty: qty,
//         gstIncludePrice:
//           Number(item.price) + Number(item.price * (Number(item.gst) / 100)),
//       };
//       const obj = data;
//       addToCartItem(obj);
//     }
//   };

//   return (
//     // <div>
//     //   {product && product !== undefined ?
//     //     <Link classNameName="single_card_wrapper" to={{ pathname: '/SingleProductPage',state: product.id} } >
//     //       <img src={product.image} alt="" classNameName="in_card_img" />
//     //       <div classNameName="card_dis_wrapper">
//     //         <div classNameName="in_card_dis">{product.name}</div>
//     //         <div classNameName="in_card_price">&#8377;{product.price}</div>
//     //       </div>
//     //     </Link>
//     //     : null}
//     // </div>
//     <div>
//       {product && product !== undefined ? (
//         <Link to={{ pathname: "/SingleProductPage", state: product.id }}>
//           <div className="product-card">
//             {product.category.slice(0, 1).map((item) => {
//               return <div className="badge">{item}</div>;
//             })}
//             <div className="product-tumb">
//               <img src={product.image} alt="" />
//             </div>
//             <div className="product-details">
//               <h4>
//                 <a href="">{product.name}</a>
//               </h4>
//               <span className="product-mrp">
//                 MRP: &nbsp; &#x20B9;{product.mrp}
//               </span>
//               <span className="product-category">{product.seller_name}</span>
//               <p>{product.compostion}</p>
//               <span className="product-catagory">
//                 <labal style={{ color: "#e8590c" }}>By:</labal>{" "}
//                 {product.manufacture}
//               </span>
//               <div className="product-bottom-details">
//                 <div className="product-price">
//                   &#x20B9;{product.price}&nbsp;
//                   <small>&#x20B9;{product.selling_price}</small>
//                 </div>
//                 <div className="product-links">
//                   <a href="">
//                     <i className="fa fa-heart"></i>
//                   </a>
//                   <Link
//                     to={{ pathname: "/cart" }}
//                     style={{ width: "100px" }}
//                     onClick={() => {
//                       cartAddValue(product);
//                     }}>
//                     <i className="fa fa-shopping-cart"></i>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Link>
//       ) : null}
//     </div>
//   );
// };

// export default ProductCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../constants";
import { useCartContext } from "../../context/cart_context";
import "./productCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { accept_header, add_wishlist_url } from "../../Utils/constatns";
import axios from "axios";

const ProductCard = (props) => {

  const [wishlistcalling1, setWishlistcalling1] = useState(1);
  const [loading, SetLoading] = useState(1);

  const user_id = localStorage.getItem("userid");

  useEffect(() => {
    console.log("user id is", user_id);
  }, [])


  // Add wishlist api

  const addWishlist = (productid) => {

    SetLoading(true);
    let userid = localStorage.getItem("token");
    console.log("token is", userid);


    const formdata = new FormData();
    formdata.append("product_id", productid);
    formdata.append("calling", wishlistcalling1);



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
        } else {
          null;
          SetLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        SetLoading(false);
      });

  }

  const product = props.product;
  const { addToCartItem, cart } = useCartContext();
  const [value, setValue] = React.useState("1");
  const [check, setCheck] = React.useState(false);
  const [redux_item, setReduxItem] = React.useState("");
  const [redux_index, setReduxIndex] = React.useState("");
  const [qty, setQty] = useState(1);
  const [isRefresh, setRefresh] = useState(false);
  const [offer_qty, setOfferQty] = useState(0);

  useEffect(() => {
    if (product || product !== undefined) {
      setQty(
        product.bonus_offer_get === 0 && product.bonus_offer_buy === 0
          ? 1
          : Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
      );
      setOfferQty(
        Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
      );
    }
    if (cart.length > 0) {
      setCheck(cart.some((data) => data.id === product.id));
      setReduxItem(cart.find((data) => data.id === product.id));
      setReduxIndex(cart.findIndex((data) => data.id === product.id));
    }
  }, [props.product, cart]);

  useEffect(() => {
    if (check) {
      setQty(redux_item.user_qty);
    } else {
      setQty(
        product.bonus_offer_get === 0 && product.bonus_offer_buy === 0
          ? 1
          : Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
      );
      setOfferQty(
        Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
      );
    }
  }, [check]);

  useEffect(() => {
    if (check) {
      setQty(redux_item.user_qty);
    } else {
      setQty(
        product.bonus_offer_get === 0 && product.bonus_offer_buy === 0
          ? 1
          : Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
      );
      setOfferQty(
        Number(product.bonus_offer_buy) + Number(product.bonus_offer_get)
      );
    }
  }, [isRefresh]);

  const cartAddValue = async (item) => {
    const check = await cart.some(
      (data) => data.sellers.id === product.sellers.id
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
    }
  };

  useEffect(() => {
    console.log("product is", product);
  }, [])

  return (
    // <div>
    //   {product && product !== undefined ?
    //     <Link classNameName="single_card_wrapper" to={{ pathname: '/SingleProductPage',state: product.id} } >
    //       <img src={product.image} alt="" classNameName="in_card_img" />
    //       <div classNameName="card_dis_wrapper">
    //         <div classNameName="in_card_dis">{product.name}</div>
    //         <div classNameName="in_card_price">&#8377;{product.price}</div>
    //       </div>
    //     </Link>
    //     : null}
    // </div>
    <div>
      {product && product !== undefined ? (
        <Link to={{ pathname: "/SingleProductPage", state: product.id }}>
          <div className="product-card">
            {product.category.slice(0, 1).map((item) => {
              return <div className="badge">{item}</div>;
            })}
            <div className="product-tumb">
              <img src={product.image} alt="" />
            </div>
            <div className="product-details">
              <h4>
                <a href="">{product.name}</a>
              </h4>
              <span className="product-mrp">
                MRP: &nbsp; &#x20B9;{product.mrp}
              </span>
              <span className="product-category">{product.seller_name}</span>
              <p>{product.compostion}</p>
              <span className="product-catagory">
                <labal style={{ color: "#e8590c" }}>By:</labal>{" "}
                {product.manufacture}
              </span>
              <div className="product-bottom-details">
                <div className="product-price">
                  &#x20B9;{product.price}&nbsp;
                  <small>&#x20B9;{product.selling_price}</small>
                </div>
                <div className="product-links">
                  <Link to={{ pathname: "/Wishlist" }}>
                    {/* <i className="fa fa-heart"></i> */}
                    {user_id === "" ? null : <>{product.is_wishlist === true ? <AiFillHeart size="20px" /> : <AiOutlineHeart size="20px" onClick={() => addWishlist(product.id)} />}
                    </>}

                  </Link>
                  <Link
                    to={{ pathname: "/cart" }}
                    style={{ width: "100px" }}
                    onClick={() => {
                      cartAddValue(product);
                    }}>
                    <i className="fa fa-shopping-cart"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default ProductCard;
