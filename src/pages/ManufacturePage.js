import React, { useEffect, useState } from "react";
import Manufacture from "../container/manufacture/Manufacture";
import { useProductsContext } from "../context/products_context";
import { useUserContext } from "../context/user_context";
import { manu_url } from "../Utils/constatns";

const ManufacturePage = (props) => {
  const { userid } = useUserContext();
  const { fetchManufactureProducts } = useProductsContext();
  const [manu_name, setMname] = useState("");

  window.scrollTo(0, 0);

  useEffect(() => {
    const id = props.location.state.manu_id;
    // const m_name = props.location.manu_name;
    setMname(props.location.state.manu_name);
    // console.log("=-=-=->", props.location.state.manu_name);

    fetchManufactureProducts(`${manu_url}${id}/${userid}`);
  }, [props.location.state]);

  return (
    <div
      style={{ paddingTop: "7%", background: "#f4f4f7", paddingBottom: "4%" }}
    >
      <Manufacture manu_name={manu_name} />
    </div>
  );
};

export default ManufacturePage;
