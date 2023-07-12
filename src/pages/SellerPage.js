import React, { useEffect, useState } from "react";
import Seller from "../container/seller/Seller";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { seller_url } from "../Utils/constatns";

const SellerPage = (props) => {
  const { userid } = useUserContext();
  const { fetchSellerProducts } = useProductsContext();
  const [seller_name, setName] = useState("");
  const [total_pro, setTotal_pro] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    // console.log(props.location.state);
    const id = props.location.state.seller_id;
    // console.log("ids, setid", id, userid);
    setName(props.location.state.seller_name);
    fetchSellerProducts(`${seller_url}${id}/${userid}`);
  }, [props.location.state]);

  return (
    <div style={{ paddingTop: "10%", background: "#f4f4f7" }}>
      <Seller seller_name={seller_name} />
    </div>
  );
};

export default SellerPage;
