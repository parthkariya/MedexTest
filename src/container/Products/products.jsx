import React, { useEffect } from "react";
import "./products.css";
import { useProductsContext } from "../../context/products_context";
import { products_url } from "../../Utils/constatns";
import { ProductCard } from "../../components";

import Carousel, { consts } from "react-elastic-carousel";
import { Button } from "@mui/material";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { images } from "../../constants";

const Data = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

const breakPoints = [
  { width: 500, itemsToShow: 1, itemsToScroll: 1, Arrow: false },
  { width: 778, itemsToShow: 2, itemsToScroll: 2 },
  { width: 870, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 3 },
];

const myArrow = ({ type, onClick, isEdge }) => {
  const pointer =
    type === consts.PREV ? (
      <img src={images.left} className="carosel_arrow" />
    ) : (
      <img src={images.right} className="carosel_arrow" />
    );
  return (
    <Button className="carosel_button" onClick={onClick} disabled={isEdge}>
      {pointer}
    </Button>
  );
};

const Products = (props) => {
  const { products } = useProductsContext();

  window.scrollTo(0, 0);

  return (
    <div className="product__wrapper popular__padding">
      <h1 className="base__heading_text product_h1">Products</h1>

      {/* Product START */}
      <Carousel
        renderArrow={myArrow}
        width={10}
        breakPoints={breakPoints}
        className="banner_overly_wrapper"
        enableAutoPlay
        autoPlaySpeed={2000}
        itemPadding={[0, 5]}
        pagination={false}
        infiniteScroll={true}
      >
        {/* <div className="cards__wrapper"> */}
        {products && products.length > 0
          ? products.slice(0, 8).map((item, index) => {
            return <ProductCard product={item} />;
          })
          : null}
        {/* </div> */}
      </Carousel>

      {/* CARDS END */}

      {/* CAROUSEL START */}
      {/* CAROUSEL END */}
    </div>
  );
};

export default Products;
