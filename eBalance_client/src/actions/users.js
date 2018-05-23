import axios from 'axios';
import { GET_ALL_USERS } from './types';

export const getAll = () => async dispatch => {
  try {
    let users = await axios.get('/http://localhost:2345/api/users/all');

    dispatch({
      type: GET_ALL_USERS,
      payload: users,
    })
  } catch ({errors}) {
    return errors
  }

};

export const removeUser = (id) => async dispatch => {
  
};

