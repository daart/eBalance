import { combineReducers } from 'redux';

import auth from './auth';
import accounts from './accounts';
import categories from './categories';
import transactions from './transactions';
import app from './app';

const reducer = combineReducers({
  auth,
  app,
  accounts,
  categories,
  transactions,
});

export default reducer;
