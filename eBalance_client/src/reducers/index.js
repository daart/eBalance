import { combineReducers } from 'redux';

import auth from './auth';
import accounts from './accounts';
import app from './app';

const reducer = combineReducers({
  auth,
  app,
  accounts,
});

export default reducer;
