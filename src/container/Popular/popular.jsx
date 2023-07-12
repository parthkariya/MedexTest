import React from "react";
import { ProductCard } from "../../components";
import { useProductsContext } from "../../context/products_context";
import "./popular.css";

import Carousel, { consts } from "react-elastic-carousel";
import { Button } from "@mui/material";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { images } from "../../constants";

const Data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const breakPoints = [
  { width: 500, itemsToShow: 1, itemsToScroll: 1, Arrow: false },
  { width: 778, itemsToShow: 3, itemsToScroll: 2 },
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

const Popular = () => {
  const { products } = useProductsContext();

  return (
    <div className="popular__wrapper popular__padding">
      <h1 className="popular_h1 base__heading_text">Popular</h1>
      <p className="popular_dis">Lorem ipsum dolor sit amet consectetur.</p>
      {/* <div className="popular_card_wrapper"> */}
      <Carousel
        renderArrow={myArrow}
        breakPoints={breakPoints}
        className="banner_overly_wrapper"
        enableAutoPlay
        autoPlaySpeed={2000}
        itemPadding={[0, 5]}
        pagination={false}
        width={200}
      >
        {products && products.length
          ? products.slice(0, 4).map((item, index) => {
              return <ProductCard product={item} />;
            })
          : null}
      </Carousel>
      {/* </div> */}
    </div>
  );
};

export default Popular;
