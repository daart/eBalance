import axios from 'axios';

import {
  TRANSACTIONS_GET_ALL,
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_DELETE,
  TRANSACTION_GET,
} from './types.js';

export const getAll = (pageNum = 1) => async dispatch => {
  // const apiResponse = await axios.get('http://localhost:2345/api/transactions');
  // const apiResponse = await axios.get(`http://localhost:2345/api/transactions?page=${pageNum}`);
  const apiResponse = await axios.get(`http://localhost:2345/api/transactions?page=` + +pageNum);

  const { transactions, count, limit, offset } = apiResponse.data;

  console.log('transactions Thunk ! --=->', transactions, ' count -> ', count, limit);
  
  dispatch({ 
    type: TRANSACTIONS_GET_ALL, 
    payload: {
      rows: transactions,
      count,
      limit,
      offset
    }
  });

  return Promise.resolve(transactions);
}

export const deleteOne = (id) => async dispatch => {
  try {
    const apiResponse = await axios.delete('http://localhost:2345/api/transactions/' + id);
    const { transaction } = apiResponse.data;

    dispatch({ type: TRANSACTION_DELETE, payload: id });

    return Promise.resolve(transaction);
  } catch (err) {
    return Promise.reject({ ...err });
  }
}

export const createOne = (transaction) => {
  console.log(transaction);

  return {
    type: TRANSACTION_CREATE, payload: transaction
  }
};

export const getOne = (id) => ({
  type: TRANSACTION_GET,
  payload: id
});

export const updateOne = (formData) => ({ type: TRANSACTION_UPDATE, payload: formData });
