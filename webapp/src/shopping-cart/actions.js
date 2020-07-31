export const GET_CATEGORY = "GET_CATEGORY";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const DELETE_FROM_CART_SUCCESS = "DELETE_FROM_CART_SUCCESS";

import { INTEGRATION_URL } from "../../constants/app-url-config.js";
import {} from "./reducer.js";

export const getCategory = (data) => ({
  type: GET_CATEGORY,
  payload: data,
});

export const getProducts = (data) => ({
  type: GET_PRODUCTS,
  payload: data,
});

export const addToCartSuccess = (id) => ({
  type: ADD_TO_CART_SUCCESS,
  id,
});
export const deleteFromCartSuccess = (id) => ({
  type: DELETE_FROM_CART_SUCCESS,
  id,
});

export function fetchCategories() {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      fetch(`${INTEGRATION_URL}/product_details`, {
        method: "GET",
        mode: "cors",
      })
        .then((data) => data.json())
        .then((data) => {
          dispatch(getCategory(data));
          resolve(true);
        })
        .catch((err) => {
          resolve(false);
        });
    });
  };
}

export function fetchProducts(category, sub_category) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      const url = `${INTEGRATION_URL}/products_by_category?category_name=${category}&sub_category_name=${sub_category}`;
      fetch(url, {
        method: "GET",
        mode: "cors",
      })
        .then((data) => data.json())
        .then((data) => {
          dispatch(getProducts(data));
          resolve(true);
        })
        .catch((err) => {
          resolve(false);
        });
    });
  };
}
