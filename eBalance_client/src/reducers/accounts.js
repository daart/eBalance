import {
  ACCOUNTS_GET_ALL,
  ACCOUNT_CREATE,
} from './../actions/types';

import {
  createOne,
  getAll,
} from './../actions/accounts';

const accounts = (state = [], { type, payload }) => {
  switch(type) {

    case ACCOUNT_CREATE:
      return [
        ...state,
        payload
      ];
    case ACCOUNTS_GET_ALL:

      return state;
      
    default:
      return state;
  }
}

export default accounts;
