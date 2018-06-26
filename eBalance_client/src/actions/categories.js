import axios from 'axios';

import {
  CATEGORIES_GET_ALL,
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_GET,
} from './types.js';

export const getAll = () => async dispatch => {
  try {
    const apiResponse = await axios.get('http://localhost:2345/api/categories');
    const { categories } = apiResponse.data;

    dispatch({ type: CATEGORIES_GET_ALL, payload: categories });

    return Promise.resolve(categories);
  } catch (err) {
    return Promise.reject({ ...err });
  }
}

export const deleteOne = (id) => async dispatch => {
  try {
    const apiResponse = await axios.delete('http://localhost:2345/api/categories/' + id);
    const { category } = apiResponse.data;

    dispatch({ type: CATEGORY_DELETE, payload: id });

    return Promise.resolve(category);
  } catch (err) {
    return Promise.reject({ ...err });
  }
}

export const createOne = (category) => ({
  type: CATEGORY_CREATE, payload: category
});

export const getOne = (id) => ({
  type: CATEGORY_GET,
  payload: id
});

export const updateOne = (formData) => ({ type: CATEGORY_UPDATE, payload: formData });