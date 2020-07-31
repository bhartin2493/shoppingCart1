import { GET_CATEGORY, GET_PRODUCTS } from "./actions.js";

const initialState = {
  categoryList: [],
  productsList: [],
};

const reducer = (state = initialState, action) => {
  if (action.type == GET_CATEGORY) {
    return Object.assign({}, state, { categoryList: action.payload.data });
  } else if (action.type == GET_PRODUCTS) {
    return Object.assign({}, state, { productsList: action.payload.data });
  }
  return state;
};

export default reducer;
