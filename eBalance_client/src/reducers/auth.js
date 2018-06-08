import jwt from 'jsonwebtoken';

import { 
  LOGIN,
  LOGOUT,
} from './../actions/types';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const decodeToken = token => {
  try {
    let decoded = jwt.decode(token);
    const { login, email, id } = decoded;

    return { login, email, id };
  } catch(err) {
    return null;
  }

}

const auth = (state = initialState, { type, payload }) => {
  switch(type) {
    case LOGIN:
    {
      let { token } = payload;
      
      return {
        isAuthenticated: true,
        token: token,
        user: decodeToken(token)
      }
    }
    case LOGOUT:
      return {
        isAuthenticated: false,
        token: null,
        user: null,
      }

    default:
      return state
  }
}

export default auth;
