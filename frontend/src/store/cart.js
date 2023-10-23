import Axios from "axios";

const CART_ADD_ITEM = "CART_ADD_ITEM";

// Reducers
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    default:
      return state;
  }
};

// Action  Creators
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        qty,
      },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  } catch (error) {}
};
