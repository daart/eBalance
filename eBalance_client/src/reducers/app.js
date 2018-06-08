import {
  APP_READY,
  APP_NOT_READY
} from './../actions/types';

let defaultState = {
  isAppReady: false
};

const app = (state = defaultState, { type, payload }) => {
  switch(type) {
    case APP_READY:
      {
        let { isAppReady } = payload;

        return {
          ...state,
          isAppReady
        }
      }
    
    case APP_NOT_READY:
      {
        let { isAppReady } = payload;

        return {
          ...state,
          isAppReady
        }
      }

    default:
      return state;
  }
}

export default app;
