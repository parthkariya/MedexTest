import React from "react";

const Checkout = () => {
  return (
    <section class="checkout_wrapper">
      <div class="contact_info">
        <h3>Contact Information</h3>
        <h4>Already have an accout ? Log in</h4>
        <form>
          <input type="text" placeholder="Email or mobile number"></input>
          <input type="checkbox">Keep Me Up To Date On News And Offers</input>
        </form>
        <div class="checkout_divider">
          <span class="divider_line"></span>
          <p>OR</p>
          <span class="divider_line"></span>
        </div>
        <form class="contact_form">
          <lable>Full Name</lable>
          <input type="text"></input>
          <lable>Phone</lable>
          <input type="text"></input>
          <lable>Address</lable>
          <input type="text"></input>
          <lable>Country</lable>
          <input type="text"></input>
          <lable>State</lable>
          <input type="text"></input>
          <lable>City</lable>
          <input type="text"></input>
          <lable>Postal Code</lable>
          <input type="text"></input>
        </form>
      </div>
      <div class="checkout_card"></div>
    </section>
  );
};

export default Checkout;
