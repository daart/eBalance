import axios from 'axios';

import { 
  ACCOUNTS_GET_ALL,
  ACCOUNT_CREATE,
  ACCOUNT_UPDATE,
  ACCOUNT_DELETE,
  ACCOUNT_GET,
} from './types.js';

export const getAll = () => async dispatch => {
  const apiResponse = await axios.get('http://localhost:2345/api/accounts');
  const { accounts } = apiResponse.data;

  dispatch({ type: ACCOUNTS_GET_ALL, payload: accounts });

  return Promise.resolve();
}

export const deleteOne = (id) => async dispatch => {
  try {
    const apiResponse = await axios.delete('http://localhost:2345/api/accounts/' + id);
    const { account } = apiResponse.data;
  
    dispatch({ type: ACCOUNT_DELETE, payload: id });
    
    return Promise.resolve(account);
  } catch(err) {
    return Promise.reject({...err});
  }
}

export const createOne = (account) => ({
  type: ACCOUNT_CREATE, payload: account
});

export const getOne = (id) => ({
  type: ACCOUNT_GET,
  payload: id  
});

export const updateOne = (formData) => ({ type: ACCOUNT_UPDATE, payload: formData });
