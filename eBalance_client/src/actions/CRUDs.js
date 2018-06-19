import {
  GET_ALL,
  GET_ONE,
  DELETE_ONE,
  UPDEATE_ONE,
  ADD_ONE,
} from './types';

export const getAll = (apiUrl, context) => {
  let apiResponse = axios.get(apiUrl);
  let context = apiResponse.data[context];

  dispatch({
    type: GET_ALL,
    payload: context
  });
};

export const addOne = (apiUrl, context, formData) => {
  let apiResponse = axios.post(apiUrl, formData);
  let 
}