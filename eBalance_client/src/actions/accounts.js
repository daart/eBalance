import axios 'axios';

import { 
  ACCOUNTS_GET_ALL,
  ACCOUNT_CREATE,
} from './types.js';

export const getAll = () => async dispatch => {
  const apiResponse = await axios.get('http://localhost:2345/api/accounts/all');
  const { accounts } = apiResponse.data;

  dispatch({ type: ACCOUNTS_GET_ALL });
  
}

export const createOne = (formData) => async dispatch => {
  const apiResponse = await axios.get('http://localhost:2345/api/accounts/create');
  const { account } = apiResponse.data;

  dispatch({ type: ACCOUNTS_GET_ALL, payload: formData });

}