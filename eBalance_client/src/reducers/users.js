import { GET_ALL_USERS } from './../actions/users';

const initialState = [];

const users = (state = [], {type, payload }) => {
  switch(type) {
    case GET_ALL_USERS:
      return [
        ...initialState,
        payload
      ];
    default:
      return state;
  }
};

export const users;

