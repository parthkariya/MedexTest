import React, { useEffect, useState } from "react";
import "./navbar.css";
import { images } from "../../constants";
import { MdShoppingCart } from "react-icons/md";
import { MdPersonAddAlt1, MdLogout, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import LoginComponent from "../Login/LoginComponent";
import { useUserContext } from "../../context/user_context";
import { useCartContext } from "../../context/cart_context";
import { useProductsContext } from "../../context/products_context";
import { Dropdown } from "antd";

const Navbar = (props) => {
  const { isLogin, logoutUser, userid } = useUserContext();
  const { cart, total } = useCartContext();
  const { searchProducts, products, search_product, onClearSearchResult } =
    useProductsContext();
  const [showscreen, setShowlogin] = React.useState(false);

  const [search, setSearch] = useState("");
  const [total_qty, setQty] = useState(0);

  const onSearch = (search) => {
    setSearch(search);
    const formData = new FormData();
    formData.append("search", search);
    formData.append("customer_id", userid);
    // console.log(search, userid)
    searchProducts(formData);
  };

  const clearSearch = () => {
    onClearSearchResult();
    setSearch("");
  };

  document.addEventListener("click", function handleClickOutsideBox(event) {
    const box = document.getElementById("mySerach");

    if (box !== null) {
      if (!box.contains(event.target)) {
        box.style.display = "none";
        clearSearch();
      }
    }
  });

  // document.addEventListener("click", function handleClickOutsideBox(event) {
  //   const box = document.getElementById("mySerach");

  //   if (!box.contains(event.target)) {
  //     box.style.display = "none";
  //     setSearch();
  //   }
  // });

  useEffect(() => {
    var total_qty = 0;
    for (var i = 0; i < cart.length; i++) {
      total_qty = total_qty + Number(cart[i].user_qty);
    }
    setQty(total_qty);
    // console.log("====", total_qty)
  }, [cart, total]);

  return (
    <nav className="sticky">
      <marquee direction="left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolorum
        corrupti, praesentium in itaque possimus consequatur dolor iure
        reprehenderit nesciunt?
      </marquee>
      <div className="navbar__wrapper">
        <Link className="nav__logo" to={{ pathname: "/" }}>
          <img
            src={images.medex_m_logo}
            alt="medex m logo"
            className="m_logo"
          />
          <img
            src={images.medex_text_logo}
            alt="medex text logo"
            className="text_logo"
          />
        </Link>
        <div className="nav_serchbar">
          {/* <Paper
         component="form"
         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, border: '2px solid #81cfdb' }}
        >
          <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Medicine"
          inputProps={{ 'aria-label': 'search' }}
          className="input_text"
          />
          <IconButton type="submit" sx={{ p: '10px' }} className="serchbar" aria-label="search">
          <SearchIcon  className="serchbar_icon"/>
          </IconButton>
       </Paper>  */}
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              name=""
              placeholder="Search"
              onChange={(val) => onSearch(val.target.value)}
              value={search}
            />
            <button className="search-btn" onClick={() => onSearch(search)}>
              <i class="fas fa-search"></i>
            </button>
            {/* <Link class="search-btn" to={{ pathname: "/Search", state: search }}  >
              <i class="fas fa-search"></i>
            </Link> */}

            {search_product.length > 0 ? (
              <div className="serach-div" id="mySerach">
                {search_product.map((val, _indx) => {
                  return (
                    <div className="search_res_link">
                      <Link
                        to={{ pathname: "/SingleProductPage", state: val.id }}
                        onClick={() => clearSearch()}>
                        {val.name.length > 0 ? val.name : null}
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="nav__logos">
          <Link to={{ pathname: "/cart" }}>
            {/* <h1>{cart.length }</h1> */}
            <MdShoppingCart className="nav_alt_logo " />
            {total_qty !== 0 ? (
              <div className="shopping_cart_noti">
                {total_qty !== 0 ? total_qty : null}
              </div>
            ) : null}
          </Link>

          {isLogin ? (
            <div className="dropdown">
              <MdPerson
                className="nav_alt_logo "
              // onClick={() => logoutUser()}
              />

              {isLogin ? (
                <div class="dropdown-content">
                  <Link
                    className="footer_simple_link"
                    to={{ pathname: `/Dashboard` }}>
                    Dashboard
                  </Link>

                  <Link
                    className="footer_simple_link"
                    to={{ pathname: `/` }}
                    onClick={() => logoutUser()}>
                    Logout
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <MdPersonAddAlt1
              className="nav_alt_logo"
              onClick={() => setShowlogin(true)}
            />
          )}

          {/* <div>
  <div>
    <button class="dropbtn">Dropdown
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
</div> */}

          <div class="dropdown">
            <button class="dropbtn">
              Account
              <i class="fa fa-caret-down"></i>
            </button>

            <div class="dropdown-content">
              <Link to="/Dashboard">Profile</Link>
              <Link to="/Dashboard">My Wallet</Link>
              <Link to="./Dashboard">Order history</Link>
              <Link to="/">My account</Link>
              <Link to="/Wishlist">Wishlist</Link>
              <Link to="/">Notifications</Link>
              <a href="./TicketDetails">Ticket Details</a>
              {/* <a href="#">Logout</a> */}
              <a href="#">
                Request a non listed <br /> product
              </a>
            </div>
          </div>
        </div>
      </div>
      <LoginComponent showscreen={showscreen} setShowlogin={setShowlogin} />
    </nav>
  );
};

export default Navbar;
