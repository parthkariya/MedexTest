import React, { useContext, useState, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import reducer from "../reducer/place_order_reducer";
import axios from "axios";
import {
  place_order_url,
  guest_ordet_url,
  get_ordet_url,
  get_order_details_url,
  return_order_url,
  download_invoice_url,
  create_store_ticket,
  store_ticket_view_url,
  get_address,
  add_address_url,
  delete_address,
  accept_header,
  edit_address_url,
  cancel_order,
} from "../Utils/constatns";
import Notification from "../Utils/Notification";
import { isValidHttpUrl } from "../Utils/helpers";

import {
  PLACE_ORDER_BEGIN,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  GET_SINGLE_ORDER_DETILS,
  STORE_TICKERS_LIST,
  RE_ORDER_PRODUCT,
  DOWNLOAD_INVOICE,
  GET_ADDRESS_BEGIN,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_ERROR,
  ADD_ADDRESS_BEGIN,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
  CANCEL_ORDER_BEGIN,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR,
} from "../action";
import { useUserContext } from "./user_context";

// use for login data management
const initialState = {
  //Home page api initial state
  login_loading: false,
  order_data: {},
  my_order_list: [],
  store_ticket_list: [],
  single_order_details: {},
  address_list: [],
};
const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  //calling use Auth from Auth0
  const [state, dispatch] = useReducer(reducer, initialState);
  const { logintoken, getUserDetails } = useUserContext();

  const [orderResponse, setOrderRes] = useState({});

  //place order
  const setOrder = async (params, token) => {
    dispatch({ type: PLACE_ORDER_BEGIN });
    try {
      const response = await axios.post(place_order_url, params, {
        headers: {
          Accept: "application/x.medex.v1+json",
          Authorization: "Bearer ".concat(token),
        },
      });
      const logindata = response.data;
      // console.log("plaACE ORDER ", logindata);
      if (logindata.success == 1) {
        await dispatch({ type: PLACE_ORDER_SUCCESS, payload: logindata });
        await setOrderRes(logindata);
        // await getUserDetails(token)
        return logindata;
      } else {
        dispatch({ type: PLACE_ORDER_ERROR });
        Notification("error", "Error!", logindata.message + "");
      }
    } catch (error) {
      dispatch({ type: PLACE_ORDER_ERROR });
      console.log("err :  ", error);
    }
  };

  // without login place order
  const setOrderGuest = async (params, token) => {
    dispatch({ type: PLACE_ORDER_BEGIN });
    try {
      // console.log('params ',params)
      const response = await axios.post(guest_ordet_url, params, {
        headers: {
          Accept: accept_header,
          // "Authorization": "Bearer ".concat(token)
        },
      });
      const responses = response.data;
      // console.log('plaACE setOrderGuest ',responses)
      if (responses.success == 1) {
        dispatch({ type: PLACE_ORDER_SUCCESS, payload: responses });
        return responses;
      } else {
        dispatch({ type: PLACE_ORDER_ERROR });
      }
    } catch (error) {
      console.log("plaACE error ", error);

      dispatch({ type: PLACE_ORDER_ERROR });
    }
  };

  // get my order list
  const getOrdersList = async (token) => {
    try {
      const response = await axios.post(
        get_ordet_url,
        {},
        {
          headers: {
            Accept: accept_header,
            Authorization: "Bearer ".concat(token),
          },
        }
      );
      const responses = response.data;
      // console.log('plaACE setOrderGuest ',responses)
      if (responses.success == 1) {
        dispatch({ type: GET_ORDER_SUCCESS, payload: responses.records });
      }
    } catch (error) {
      console.log("plaACE error ", error);

      dispatch({ type: PLACE_ORDER_ERROR });
    }
  };
  // get sinle order
  const getSingleOrderDetails = async (params, token) => {
    try {
      const response = await axios.get(get_order_details_url.concat(params), {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer ".concat(token),
        },
      });
      const responses = response.data;
      // console.log('plaACE setOrderGuest ',responses)
      if (responses.success == 1) {
        dispatch({ type: GET_SINGLE_ORDER_DETILS, payload: responses.records });
      }
    } catch (error) {
      console.log("plaACE error ", error);

      dispatch({ type: PLACE_ORDER_ERROR });
    }
  };
  const returnOrder = async (params, token) => {
    try {
      const response = await axios.post(return_order_url, params, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer ".concat(token),
        },
      });
      const responses = response.data;
      // console.log('plaACE setOrderGuest ',responses)
      if (responses.success == 1) {
        getOrdersList(token);
      }
      Notification("error", "Error!", responses.message + "");
    } catch (error) {
      console.log("return error ", error);

      dispatch({ type: PLACE_ORDER_ERROR });
    }
  };

  const downloadInvocie = async (params) => {
    try {
      const response = await axios.post(download_invoice_url, params, {
        headers: {
          Accept: accept_header,
        },
      });
      const responses = response.data;
      // console.log("download invoice res ", responses);
      if (responses.success == 1) {
        if (isValidHttpUrl(responses.records)) {
          window.open(responses.records);
        } else {
          Notification("error", "Error!", "PDF URL IS NOT VALID");
        }
      } else {
        Notification("error", "Error!", responses.message + "");
      }
    } catch (error) {
      console.log("return error ", error);

      dispatch({ type: PLACE_ORDER_ERROR });
    }
  };

  const createStoreIssue = async (params, token) => {
    try {
      const response = await axios.post(create_store_ticket, params, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer ".concat(token),
        },
      });
      const responses = response.data;
      // console.log("store res ", responses);
      if (responses.success == 1) {
        viewStoreissueList(token);
        Notification("success", "Success!", responses.message + "");
      } else {
        Notification("error", "Error!", responses.message + "");
      }
    } catch (error) {
      console.log("return error ", error);

      dispatch({ type: PLACE_ORDER_ERROR });
    }
  };

  const viewStoreissueList = async (token) => {
    try {
      const response = await axios.post(
        store_ticket_view_url,
        {},
        {
          headers: {
            Accept: accept_header,
            Authorization: "Bearer ".concat(token),
          },
        }
      );
      const responses = response.data;
      // console.log("store res ", responses);
      if (responses.success == 1) {
        dispatch({ type: STORE_TICKERS_LIST, payload: responses.record });
      } else {
        Notification("error", "Error!", responses.message + "");
      }
    } catch (error) {
      console.log("return error ", error);

      dispatch({ type: PLACE_ORDER_ERROR });
    }
  };

  const getAddress = async (token) => {
    dispatch({ type: GET_ADDRESS_BEGIN });
    await axios
      .get(get_address, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + logintoken,
        },
      })
      .then((res) => {
        // console.log("address", res.data);
        if (res.data.success == 1) {
          dispatch({
            type: GET_ADDRESS_SUCCESS,
            payload: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        dispatch({ type: GET_ADDRESS_ERROR });
      });
  };

  const addAddress = async (param) => {
    dispatch({ type: ADD_ADDRESS_BEGIN });
    await axios
      .post(add_address_url, param, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + logintoken,
        },
      })
      .then((res) => {
        // console.log("address", res.data);
        if (res.data.success == 1) {
          dispatch({
            type: ADD_ADDRESS_SUCCESS,
          });
          getAddress();
          Notification("success", "Success!", res.data.message + "");
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        dispatch({ type: ADD_ADDRESS_ERROR });
      });
  };

  const editAddress = async (param) => {
    dispatch({ type: ADD_ADDRESS_BEGIN });
    await axios
      .post(edit_address_url, param, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + logintoken,
        },
      })
      .then((res) => {
        // console.log("address", res.data);
        if (res.data.success == 1) {
          dispatch({
            type: ADD_ADDRESS_SUCCESS,
          });
          getAddress();
          Notification("success", "Success!", res.data.message + "");
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        dispatch({ type: ADD_ADDRESS_ERROR });
      });
  };

  const deleteAddress = async (id) => {
    const param = new FormData();
    param.append("id", id);
    dispatch({ type: ADD_ADDRESS_BEGIN });
    await axios
      .post(delete_address, param, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + logintoken,
        },
      })
      .then((res) => {
        // console.log("address", res.data);
        if (res.data.success == 1) {
          dispatch({
            type: ADD_ADDRESS_SUCCESS,
          });
          getAddress();
          Notification("success", "Success!", res.data.message + "");
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        dispatch({ type: ADD_ADDRESS_ERROR });
      });
  };

  const cancelOrder = async (param) => {
    dispatch({ type: CANCEL_ORDER_BEGIN });
    await axios
      .post(cancel_order, param, {
        headers: {
          Accept: accept_header,
          Authorization: "Bearer " + logintoken,
        },
      })
      .then((res) => {
        console.log("address--->", JSON.stringify(res, null, 2));
        if (res.data.success == 1) {
          dispatch({
            type: CANCEL_ORDER_SUCCESS,
          });
          Notification("success", "Success!", res.data.message + "");
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: CANCEL_ORDER_ERROR });
      });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        setOrder,
        setOrderGuest,
        getOrdersList,
        getSingleOrderDetails,
        returnOrder,
        downloadInvocie,
        createStoreIssue,
        viewStoreissueList,
        orderResponse,
        getAddress,
        addAddress,
        deleteAddress,
        editAddress,
        getSingleOrderDetails,
        cancelOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrderContext);
};
