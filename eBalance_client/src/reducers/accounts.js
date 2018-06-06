import {
  ACCOUNTS_GET_ALL,
  ACCOUNT_CREATE,
  ACCOUNT_UPDATE,
  ACCOUNT_DELETE,
} from './../actions/types';

const accounts = (state = [], { type, payload }) => {
  switch(type) {

    case ACCOUNT_CREATE:
      return [
        ...state,
        payload
      ];
    
    case ACCOUNT_UPDATE:
      return state.map(account => account.id === payload.id ? payload : account);

    case ACCOUNT_DELETE:
      return state.filter(account => account.id !== payload);
    
    case ACCOUNTS_GET_ALL:

      return payload;
    
    default:
      return state;
  }
}

export default accounts;
