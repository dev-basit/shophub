import Axios from "axios";
import { CART_EMPTY } from "../store/cart";

const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
const ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL";
const ORDER_CREATE_RESET = "ORDER_CREATE_RESET";
const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

// Reducer
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true, order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// Action Creator
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.post("http://localhost:5002" + "/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const resetOrders = () => async (dispatch) => {
  dispatch({ type: ORDER_CREATE_RESET });
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};
