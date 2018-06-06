import { combineReducers } from 'redux';

import auth from './auth';
import accounts from './accounts';

const reducer = combineReducers({
  auth,
  accounts,
});

export default reducer;
