import React from "react";
import Carousel, { consts } from "react-elastic-carousel";
import { BannerCard } from "../../components";
import { MdPhone } from "react-icons/md";
import "./banner.css";
import { useHomeContext } from "../../context/home_context";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { images } from "../../constants";
// import { BsFillArrowLeftCircleFill } from "react-icons/bs";
// import { BsFillArrowRightCircleFill } from "react-icons/bs";

// import { Button } from 'bootstrap';

const Banner = (props) => {
  const { categories, detail, blog } = useHomeContext();

  const breakPoints = [
    { width: 500, itemsToShow: 1, itemsToScroll: 1 },
    { width: 778, itemsToShow: 2, itemsToScroll: 1 },
    { width: 1200, itemsToShow: 3, itemsToScroll: 1 },
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

  return (
    <div className="banner__wrapper">
      <div className="banner__background">
        <div className="nav_links_section">
          <div className="nav__links">
            {categories && categories.length > 0
              ? categories.map((c, index) => {
                  return (
                    <ul className="top_submenu">
                      <li className="sec_sub">
                        <Link
                          className="nav_link"
                          to={{ pathname: "/ProductPage", state: c.id }}
                        >
                          {c.name}
                        </Link>
                        <ul className="third_sub">
                          {c.items.map((val, _indx) => {
                            return (
                              <li className="forth_sub">
                                <Link
                                  className="nav_link"
                                  to={{
                                    pathname: "/ProductPage",
                                    state: val.id,
                                  }}
                                >
                                  {val.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    </ul>
                  );
                })
              : null}
          </div>

          <div className="banner_contectus_section">
            <a
              href="https://applified.co.in/medex/seller/login"
              target="_blank"
              className="contectus_btn"
            >
              SELL ON MEDEX
            </a>
            <div className="contectus_line">|</div>
            {detail && detail.length > 0
              ? detail.slice(5, 6).map((item, index) => {
                  return (
                    <p className="contectus_nub">
                      <MdPhone />
                      {item.value}
                    </p>
                  );
                })
              : null}
          </div>
        </div>

        <Carousel
          renderArrow={myArrow}
          width={10}
          breakPoints={breakPoints}
          className="banner_overly_wrapper"
          enableAutoPlay
          autoPlaySpeed={2000}
          itemPadding={[0, 5]}
          pagination={false}
        >
          {blog && blog.length > 0
            ? blog.map((item, index) => {
                return <BannerCard bannerCard={item} />;
              })
            : null}
        </Carousel>
      </div>

      {/* <div className="banner_overly_wrapper"> */}

      {/* </div>  */}
    </div>
  );
};

export default Banner;
