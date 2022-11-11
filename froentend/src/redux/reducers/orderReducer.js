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
  CREATE_PAY_RESET,
  CREATE_MY_ORDERS_REQUEST,
  CREATE_MY_ORDERS_SUCCESS,
  CREATE_MY_ORDERS_FAIL,
  CREATE_MY_ORDERS_RESET,
} from "../constants/orderConstants";

export const orederCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const orederDetailsReducer = (
  state = { orderItems: [], loading: true, shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CREATE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayRedcer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PAY_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myOrderListRedcer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CREATE_MY_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case CREATE_MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case CREATE_MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_MY_ORDERS_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};
