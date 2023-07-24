import React, { useEffect, useState } from "react";
import CheckOutPage from "../../pages/CheckOutPage";
import "./AddAddress.css";

import { MdCancel } from "react-icons/md";
import { useOrderContext } from "../../context/place_order_context";
import axios from "axios";
import { get_cities, get_countries, get_state } from "../../Utils/constatns";

const NewAddress = ({
  newAddress,
  setNewAddress,
  isEdit,
  setEdit,
  editData,
}) => {
  const { addAddress, editAddress } = useOrderContext();

  const [id_no, setId_no] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [addr_type, setType] = useState("");

  const [city_list, setCity_list] = useState([]);
  const [country_list, setCountry_list] = useState([]);
  const [state_list, setState_list] = useState([]);
  const [address_id, setAddress_id] = useState("");

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    if (isEdit) {
      // console.log("====>", editData);
      // if (editData !== '' || editData !== undefined) {
      getState(editData.country_id);
      getCity(editData.state_id);
      setAddress_id(editData.id);
      setId_no(editData.address_id_no);
      setName(editData.fullname);
      setAddress(editData.address);
      setCountry(editData.country_id);
      setState(editData.state_id);
      setCity(editData.city_id);
      setPincode(editData.pincode);
      setType(editData.is_status);
      setMobile(editData.number);
      // }
    }
  }, [isEdit]);

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

  const add = async () => {
    const formData = new FormData();
    formData.append("address_id_no", id_no);
    formData.append("fullname", name);
    formData.append("number", mobile);
    formData.append("pincode", pincode);
    formData.append("address", address);
    formData.append("city_id", city);
    formData.append("state_id", state);
    formData.append("country_id", country);
    formData.append("is_status", addr_type);
    // console.log("formadata--->", formData);
    await addAddress(formData);
    setNewAddress(false);
  };

  const edit = async () => {
    const formData = new FormData();
    formData.append("id", address_id);
    formData.append("address_id_no", id_no);
    formData.append("fullname", name);
    formData.append("number", mobile);
    formData.append("pincode", pincode);
    formData.append("address", address);
    formData.append("city_id", city);
    formData.append("state_id", state);
    formData.append("country_id", country);
    formData.append("is_status", addr_type);
    // console.log("formadata--->", formData);
    await editAddress(formData);
    setNewAddress(false);
    setEdit(false);
  };

  return (
    <main className={newAddress ? "show dialog" : " dialog "}>
      <div className="new_address_section">
        <div className="main_container">
          <div className="sub_container">
            <div className="header_details">
              <p className="header_title">Add New Delivery Address</p>
              <p className="header_desc">
                Please enter the accurate address, it will help us to serve you
                better
              </p>
            </div>
            <div className="data_input_section">
              <div className="master_form">
                <div className="first_input">
                  <div className="id_no">
                    <label className="master_lable">ID No.</label>
                    <input
                      className="master_input"
                      type="text"
                      required
                      value={id_no}
                      onChange={(val) => setId_no(val.target.value)}
                    />
                  </div>
                  <div className="name">
                    <label className="master_lable">Name</label>
                    <input
                      className="master_input"
                      type="text"
                      required
                      value={name}
                      onChange={(val) => setName(val.target.value)}
                    />
                  </div>
                </div>
                <div className="second_input">
                  <div className="state">
                    <lable className="master_lable">Address</lable>
                    <input
                      className="address_input"
                      type="text"
                      required
                      value={address}
                      onChange={(val) => setAddress(val.target.value)}
                    />
                  </div>
                  <div className="state">
                    <lable className="master_lable">Country</lable>
                    <select
                      className="select_country"
                      required
                      value={country}
                      onChange={(val) => getState(val.target.value)}
                    >
                      <option value="" disabled selected>
                        Please Select Country
                      </option>
                      {country_list && country_list.length > 0
                        ? country_list.map((option) => (
                            <option value={option.id}>{option.name}</option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="third_input">
                  <div className="state">
                    <label className="master_lable">State</label>
                    <select
                      className="select_state"
                      required
                      value={state}
                      onChange={(val) => getCity(val.target.value)}
                    >
                      <option value="" disabled selected>
                        Please Select State
                      </option>
                      {state_list && state_list.length > 0
                        ? state_list.map((option) => (
                            <option value={option.state_id}>
                              {option.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                  <div className="city">
                    <label className="master_lable">City</label>
                    <select
                      className="select_city"
                      required
                      value={city}
                      onChange={(val) => setCity(val.target.value)}
                    >
                      <option value="" disabled selected>
                        Please Select City
                      </option>
                      {city_list && city_list.length > 0
                        ? city_list.map((option) => (
                            <option value={option.city_id}>
                              {option.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="fourth_input">
                  <div className="pin_code">
                    <label className="master_lable">Pin Code</label>
                    <input
                      className="master_input"
                      type="number"
                      required
                      value={pincode}
                      onChange={(val) => setPincode(val.target.value)}
                    />
                  </div>
                  <div className="mobile">
                    <label className="master_lable">Mobile Number</label>
                    <input
                      className="master_input"
                      type="text"
                      required
                      value={mobile}
                      onChange={(val) => setMobile(val.target.value)}
                    />
                  </div>
                </div>
                <div className="add_type">
                  <div className="add_type_one">
                    <input
                      id="at_home"
                      name="add_type"
                      className="add_type_radio"
                      type="radio"
                      value={addr_type}
                      checked={addr_type === 1 ? true : false}
                      onChange={(val) => setType(1)}
                    />
                    <label for="at_home" className="master_lable">
                      Home
                    </label>
                  </div>
                  <div className="add_type_two">
                    <input
                      id="at_office"
                      name="add_type"
                      className="add_type_radio"
                      type="radio"
                      value={addr_type}
                      checked={addr_type === 2 ? true : false}
                      onChange={(val) => setType(2)}
                    />
                    <label for="at_office" className="master_lable">
                      Office
                    </label>
                  </div>
                  <div className="add_type_three">
                    <input
                      id="at_other"
                      name="add_type"
                      className="add_type_radio"
                      checked={addr_type === 3 ? true : false}
                      onChange={(val) => setType(3)}
                      value={addr_type}
                      type="radio"
                    />
                    <label for="at_other" className="master_lable">
                      Other
                    </label>
                  </div>
                </div>
                <div className="master_buttons">
                  {isEdit ? (
                    <button
                      className="submit_btn"
                      type="submit"
                      onClick={() => edit()}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="submit_btn"
                      type="submit"
                      onClick={() => add()}
                    >
                      Continue
                    </button>
                  )}
                  <button
                    className="cancel_btn"
                    type="cancle"
                    onClick={() => {
                      setNewAddress(!newAddress);
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cancel_container">
          <MdCancel
            className="md_cancle_btn"
            onClick={() => setNewAddress(!newAddress)}
          />
        </div>
      </div>
    </main>
  );
};

export default NewAddress;
