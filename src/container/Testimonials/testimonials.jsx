import React from "react";
import "./testimonials.css";
import { TestimonialCard } from "../../components";
import Carousel, { consts } from "react-elastic-carousel";
import { Button } from "@mui/material";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { images } from "../../constants";
import { useHomeContext } from "../../context/home_context";

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

const Data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const Testimonials = (props) => {
  const { testimonials } = useHomeContext();

  return (
    <div className="testimonials__wrapper popular__padding">
      <h1 className="testimonials_h1 base__heading_text">Testimonials</h1>
      <h1 className="testimonials_dis">
        Lorem ipsum dolor sit amet consectetur.
      </h1>

      {/* <div className="testimonials_cards_wrapper">
        {Data.slice(0, 3).map((item, index) => {
          return (
            <TestimonialCard />
          )
        })}
      </div> */}

      {/* ** CAROUSEL START ** */}

      <Carousel
        renderArrow={myArrow}
        width={10}
        breakPoints={breakPoints}
        className="banner_overly_wrapper"
        enableAutoPlay
        autoPlaySpeed={2500}
        itemPadding={[0, 5]}
        pagination={false}
      >
        {testimonials.data && testimonials.data.length > 0
          ? testimonials.data.map((item, index) => {
              return <TestimonialCard testimonial={item} />;
            })
          : null}
      </Carousel>

      {/* ** CAROUSEL END ** */}
    </div>
  );
};

export default Testimonials;
