import React, { useEffect, useState } from "react";
import "./footer.css";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { accept_header, home_url } from "../../Utils/constatns";
import { useHomeContext } from "../../context/home_context";

const Footer = () => {
  const { info, detail } = useHomeContext();

  return (
    // ////////////////  Chat Icon  ////////////////

    // ////////////////////////////////////////////

    <div className="footer__main_section main__section_padding">
      <div className="footer__wrapper">
        <div className="footer-logo-padding">
          <a
            class="menu-link btn-contact"
            href="//api.whatsapp.com/send?phone=91988388743&text=Let's Get in Touch"
            target="_blank"
          >
            <div>
              <img className="float_wapp" src={images.wapp}></img>
            </div>
          </a>
        </div>
        <div>
          <a
            class="menu-link btn-contact"
            // href="//api.whatsapp.com/send?phone=91988388743&text=Let's Get in Touch"
            target="_blank"
          >
            <div>
              <img className="float_wapp2" src={images.gmail}></img>
            </div>
          </a>
        </div>
        <div className="footer_line"></div>
        <div className="footer__flex_wrapper">
          <div className="footer__logo_section">
            <Link to={{ pathname: "/" }} className="footer_logo_wrapper">
              <img
                src={images.medex_m_logo}
                alt="medex_m_logo"
                className="footer_m_logo"
              />
              <img
                src={images.medex_text_logo}
                alt="medex_m_logo"
                className="footer_text_logo"
              />
            </Link>
            {detail && detail.length > 0
              ? detail.slice(4, 8).map((item, index) => {
                return (
                  <>
                    <p className="footer_logo_text">
                      {item.name}
                      <br></br>
                      {item.value}
                    </p>
                  </>
                );
              })
              : null}
          </div>

          <div className="footer__links_section">
            {/* <div className="link_section_first">
              <a href="/discover" className="footer_blue_link">
                Discover
              </a>

              <a href="/newSeason" className="footer_simple_link">
                New season
              </a>
              <a href="/mostSearched" className="footer_simple_link">
                Most searched
              </a>
              <a href="/mostSelled" className="footer_simple_link">
                Most selled
              </a>
            </div>

            <div className="link_section_first">
              <a href="/discover" className="footer_blue_link">
                About
              </a>

              <a href="/newSeason" className="footer_simple_link">
                Help
              </a>
              <a href="/mostSearched" className="footer_simple_link">
                Shipping
              </a>
              <a href="/mostSelled" className="footer_simple_link">
                Affiliate
              </a>
            </div> */}
            <div className="link_section_first">
              <a href="/discover" className="footer_blue_link">
                Social Media
              </a>
              {detail && detail.length > 0
                ? detail.slice(0, 4).map((item, index) => {
                  return (
                    <a href="#" className="footer_simple_link">
                      {item.name}
                    </a>
                  );
                })
                : null}
            </div>

            <div className="link_section_first">
              <a href="/discover" className="footer_blue_link">
                Info
              </a>

              <Link
                to={{ pathname: `/ContactUs` }}
                className="footer_simple_link"
              >
                Contact Us
              </Link>

              {info && info.length > 0
                ? info.map((item, index) => {
                  return item.slug == "Privacy Policies" ? (
                    <li key={index}>
                      <Link
                        className="footer_simple_link"
                        to={{
                          pathname: `/PrivacyPolicies`,
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ) : item.slug == "Terms & Condition" ? (
                    <li key={index}>
                      <Link
                        className="footer_simple_link"
                        to={{
                          pathname: `/TermsConditions`,
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ) : item.slug == "Help" ? (
                    <li key={index}>
                      <Link
                        className="footer_simple_link"
                        to={{
                          pathname: `/Help`,
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ) : item.link_type == 0 ? (
                    <li key={index}>
                      <Link
                        className="footer_simple_link"
                        to={{ pathname: `/${item.slug}`, state: item }}
                        onClick={() =>
                          localStorage.setItem("item", JSON.stringify(item))
                        }
                      >
                        {item.name}
                      </Link>
                    </li>
                  ) : null;
                })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
