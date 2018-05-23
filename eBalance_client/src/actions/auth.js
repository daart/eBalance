import axios from 'axios';

import { LOGOUT, LOGIN, VALIDATE_TOKEN } from './types';

export const login = (token) => (dispatch) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['authorization'] = token;
  
  dispatch({
    type: LOGIN,
    payload: {
      token
    },
  })
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['authorization'];

  dispatch({
    type: LOGOUT
  })
}

export const validateToken = (token) => async dispatch => {
  const res = await axios.post("http://localhost:2345/api/auth/validateToken", {
    token
  });
  const { valid } = res.data;

  if (!valid) {
    dispatch({
      type: LOGOUT
    })
  } else {
    dispatch({
      type: LOGIN
    })
  }
}
