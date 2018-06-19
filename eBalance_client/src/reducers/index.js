import { combineReducers } from 'redux';

import auth from './auth';
import accounts from './accounts';
import categories from './categories';
import app from './app';

const reducer = combineReducers({
  auth,
  app,
  accounts,
  categories,
});

export default reducer;
