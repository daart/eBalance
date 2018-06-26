import axios from 'axios';

import { LOGOUT, LOGIN, VALIDATE_TOKEN } from './types';
import { getAll as getAllAccounts } from './accounts';
import { getAll as getAllCategories } from './categories';
import { setReady, unsetReady } from './app';

export const fetchUserData = () => dispatch => {
  return Promise.all[
    dispatch(getAllAccounts()),
    dispatch(getAllCategories())
  ];
}

export const login = (token) => (dispatch) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = token;

  dispatch({
    type: LOGIN,
    payload: {
      token
    },
  })

  // TODO: fetch all user data
  // in future, we need to fetch all user related data after successful login
  // for example dispatch(fetchUserData())
  // Promise.all([getAllAccounts(), getAllCategories()]) etc

  // return dispatch(fetchUserData());
  dispatch(getAllAccounts());
  dispatch(getAllCategories());
  // for now its just fetchAccounts
  // console.log('fetching user data');
  // return dispatch(getAll());

};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];

  dispatch({
    type: LOGOUT
  })
}

export const tryToLogin = () => async dispatch => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const result = await axios.post('http://localhost:2345/api/auth/validateToken', {token});

      const { valid } = result.data;

      if (valid) {
        // console.log('token is valid, lets log in');
        await dispatch(login(token));
      } else {
        dispatch(logout());
      }

      dispatch(setReady());

      return Promise.resolve();
      
    } catch (e) {
      // console.log({...e});
      dispatch(setReady());
      return Promise.resolve();
    }
  } else {
    dispatch(logout());
    dispatch(setReady());
    return Promise.resolve();
  }
}
