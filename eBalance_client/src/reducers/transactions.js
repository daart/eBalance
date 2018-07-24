import {
  TRANSACTIONS_GET_ALL,
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_DELETE
} from "./../actions/types";

const transactions = (state = { rows: [], count: 0 }, { type, payload }) => {
  switch (type) {
    case TRANSACTION_CREATE:
      return {
        ...state,
        rows: [
          ...state.rows,
          payload
        ],
        // count: state.count++
      }; 

    case TRANSACTION_UPDATE:
      return {
        ...state,
        rows: state.rows.map(transaction => transaction.id === payload.id ? payload : transaction)
      }

    case TRANSACTION_DELETE:
      return {
        ...state,
        rows: state.rows.filter(transaction => transaction.id !== payload),
        // count: state.count--
      }

    case TRANSACTIONS_GET_ALL:
      return payload;

    default:
      return state;
  }
};

export default transactions;
