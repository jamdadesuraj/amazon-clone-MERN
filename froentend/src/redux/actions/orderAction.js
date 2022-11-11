import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_DETAILS_REQUEST,
  CREATE_DETAILS_SUCCESS,
  CREATE_DETAILS_FAIL,
  CREATE_PAY_REQUEST,
  CREATE_PAY_SUCCESS,
  CREATE_PAY_FAIL,
  CREATE_MY_ORDERS_REQUEST,
  CREATE_MY_ORDERS_SUCCESS,
  CREATE_MY_ORDERS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/orders", order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: CREATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderPay =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PAY_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}`,
        paymentResult,
        config
      );
      dispatch({ type: CREATE_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMyOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_MY_ORDERS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      "/api/orders/myorders",

      config
    );
    dispatch({ type: CREATE_MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
