import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import axios from "axios";
import Notification from "../Utils/Notification";
import { mobileValidate, emailValidate } from "../Utils/helpers";
import {
  contact_us,
  get_cities,
  get_countries,
  get_state,
} from "../Utils/constatns";

const ContactUs = () => {
  window.scrollTo(0, 0);

  const [show, setShow] = React.useState();

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [message, setmessage] = useState("");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [city_list, setCity_list] = useState([]);
  const [country_list, setCountry_list] = useState([]);
  const [state_list, setState_list] = useState([]);

  useEffect(() => {
    getCountry();
  }, []);

  const mContactus = async () => {
    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexpMobile = /^[0-9\b]+$/;

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", "test");
    formData.append("email", email);
    formData.append("number", number);
    formData.append("message", message);
    formData.append("country_id", country);
    formData.append("state_id", state);
    formData.append("city_id", city);
    // console.log("formData contact us ", formData);
    if (firstname == "") {
      Notification("error", "Error!", "Please enter your Name!");
      return;
    } else if (email == "") {
      Notification("error", "Error!", "Please enter your Email Address!");
      return;
    } else if (regEx.test(email) == false) {
      Notification("error", "Error!", "Please enter valid email id!");
      return;
    } else if (number == "") {
      Notification("error", "Error!", "Please enter your Number!");
      return;
    } else if (message == "") {
      Notification("error", "Error!", "Please enter your Message!");
      return;
    }

    const response = await axios
      .post(contact_us, formData, {
        headers: {
          Accept: "application/x.medex.v1+json",
        },
      })
      .catch((error) => console.error(`Error: ${error}`));
    if (response.data.success == 1) {
      setfirstname("");
      setemail("");
      setnumber("");
      setmessage("");

      Notification(
        "success",
        "Success!",
        "form has been successfully submitted"
      );
      return;
    } else {
      Notification("error", "Error!", "please enter valid data!");
      return;
    }
    console.log("response contact us ", response.data);
  };

  const getCountry = async () => {
    await axios
      .post(
        get_countries,
        {},
        {
          headers: {
            Accept: "application/x.medex.v1+json",
          },
        }
      )
      .then((res) => {
        // console.log(res.data)
        if (res.data.success === 1) {
          setCountry_list(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getState = async (id) => {
    await setCountry(id);
    const formData = new FormData();
    formData.append("country_id", id);
    await axios
      .post(get_state, formData, {
        headers: {
          Accept: "application/x.medex.v1+json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success === 1) {
          setState_list(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCity = async (id) => {
    await setState(id);
    const formData = new FormData();
    formData.append("country_id", country);
    formData.append("state_id", id);

    await axios
      .post(get_cities, formData, {
        headers: {
          Accept: "application/x.medex.v1+json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success === 1) {
          setCity_list(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Utility_Wrapper">
      <div className="contactus_wrapper">
        <h2>Contact Us</h2>
        <div className="container">
          <form action="/action_page.php" className="contact_form">
            <div className="row">
              <div className="col-25">
                <label className="c_fname" for="fname">
                  Your Name
                </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="fname"
                  name="yourname"
                  placeholder="Enter Your Name.."
                  className="contact_input-box"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className="c_phone" for="lname">
                  Phone No.
                </label>
              </div>
              <div className="col-75">
                <input
                  type="number"
                  id="number"
                  name="number"
                  placeholder="Enter Your Number.."
                  className="contact_input-box"
                  value={number}
                  maxLength={10}
                  onChange={(e) => {
                    if (mobileValidate(e.target.value)) {
                      setnumber(e.target.value);
                    }
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className="c_email" for="lname">
                  Email
                </label>
              </div>
              <div className="col-75">
                <input
                  type="email"
                  id="number"
                  name="number"
                  placeholder="Enter Your Email.."
                  className="contact_input-box"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className="c_country" for="country">
                  Country
                </label>
              </div>
              <div className="col-75">
                <select
                  id="country"
                  name="state"
                  className="contact_input-box"
                  required
                  value={country}
                  onChange={(val) => getState(val.target.value)}
                >
                  <option value="" disabled selected>
                    Select Your Country
                  </option>
                  {country_list && country_list.length > 0
                    ? country_list.map((option) => (
                      <option value={option.id}>{option.name}</option>
                    ))
                    : null}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className="c_state" for="country">
                  State
                </label>
              </div>
              <div className="col-75">
                <select
                  id="country"
                  name="state"
                  className="contact_input-box"
                  required
                  value={state}
                  onChange={(val) => getCity(val.target.value)}
                >
                  <option value="" disabled selected>
                    Select Your State
                  </option>
                  {state_list && state_list.length > 0
                    ? state_list.map((option) => (
                      <option value={option.state_id}>{option.name}</option>
                    ))
                    : null}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className="c_city" for="country">
                  City
                </label>
              </div>
              <div className="col-75">
                <select
                  id="country"
                  name="city"
                  className="contact_input-box"
                  required
                  value={city}
                  onChange={(val) => setCity(val.target.value)}
                >
                  <option value="" disabled selected>
                    Select Your City
                  </option>
                  {city_list && city_list.length > 0
                    ? city_list.map((option) => (
                      <option value={option.city_id}>{option.name}</option>
                    ))
                    : null}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label className="c_msg" for="subject">
                  Write Your Message
                </label>
              </div>
              <div className="col-75">
                <textarea
                  id="subject"
                  name="subject"
                  placeholder="Write Your Message Here .."
                  style={{ height: "200px" }}
                  className="contact_input-box"
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <a
                href="javascript:void(0)"
                onClick={() => mContactus()}
                className="contect_submit-btn"
              >
                SUBMIT CONTACT
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
