import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import HomePage from "./pages/HomePage";
import SingleProductPage from "./pages/SingleProductPage";
import CartItemPage from "./pages/CartItemPage";
import CheckOutPage from "./pages/CheckOutPage";
import "./App.css";
import AuthWrapper from "./pages/AuthWrapper";
import { Footer, Navbar } from "./components";
import ProductPage from "./pages/ProductPage";
import Search from "./pages/Search";
import SellerPage from "./pages/SellerPage";
import ManufacturePage from "./pages/ManufacturePage";
import PrivacyPolicies from "./pages/PrivacyPolicies";
import TermsConditions from "./pages/TermsConditions";
import Help from "./pages/Help";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./container/wishlist";
import Ticket from "./container/Ticket";
import OrderTicketView from "./components/orderticketview/OrderTicketView";
// import { Footer, Navbar } from './components';
// import { Banner, LearnMore, Popular, Products, Testimonials } from './container';

const App = () => (
  <AuthWrapper>
    <Router basename={"/medexnewtest"}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/SingleProductPage" component={SingleProductPage} />
        <Route path="/ProductPage" component={ProductPage} />
        <Route path="/Search" component={Search} />
        <Route path="/CheckOutPage" component={CheckOutPage} />
        <Route exact path="/cart" component={CartItemPage}></Route>
        <Route exact path="/sellers" component={SellerPage}></Route>
        <Route exact path="/manufactures" component={ManufacturePage}></Route>
        <Route
          exact
          path="/PrivacyPolicies"
          component={PrivacyPolicies}></Route>
        <Route
          exact
          path="/TermsConditions"
          component={TermsConditions}></Route>
        <Route exact path="/Help" component={Help}></Route>
        <PrivateRoute exact path="/Dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route exact path="/ContactUs" component={ContactUs}></Route>
        <Route exact path="/Wishlist" component={Wishlist}></Route>
        <Route exact path="/Ticket" component={Ticket}></Route>
        <Route exact path="/ticketdetails" component={OrderTicketView}></Route>
      </Switch>
      <Footer />
    </Router>
  </AuthWrapper>

  // <div className="App">
  //   <Routes  >
  //     <Route path="/" element={<HomePage />} />
  //     <Route path="/SingleProductPage" element={<SingleProductPage />} />
  //     <Route path="/CartItemPage" element={<CartItemPage />} />
  //   </Routes>
  // </div>
);

export default App;
