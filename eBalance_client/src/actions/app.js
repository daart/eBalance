import {
  APP_READY,
  APP_NOT_READY
} from './types';

export const init = () => ({

});

export const setReady = () => ({
  type: APP_READY,
  payload: {
    isAppReady: true,
  }
});

export const unsetReady = () => ({
  type: APP_NOT_READY,
  payload: {
    isAppReady: false,
  }
});

