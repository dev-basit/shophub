import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import { cartReducer } from "./cart";
import { productDetailsReducer, productListReducer } from "./products";
import { userSigninReducer, userRegisterReducer } from "./user";
import { orderReducer, orderDetailsReducer } from "./orders";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : { fullName: "", address: "", city: "", postalCode: "", country: "" },
    paymentMethod: "PayPal",
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
