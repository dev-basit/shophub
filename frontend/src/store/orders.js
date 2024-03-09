import Axios from "axios";
import { CART_EMPTY } from "../store/cart";

const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
const ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL";
const ORDER_CREATE_RESET = "ORDER_CREATE_RESET";

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
