import {
  CATEGORIES_GET_ALL,
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
} from './../actions/types';

const categories = (state = [], { type, payload }) => {
  switch (type) {

    case CATEGORY_CREATE:
      return [
        ...state,
        payload
      ];

    case CATEGORY_UPDATE:
      return state.map(category => category.id === payload.id ? payload : category);

    case CATEGORY_DELETE:
      return state.filter(category => category.id !== payload);

    case CATEGORIES_GET_ALL:

      return payload;

    default:
      return state;
  }
}

export default categories;
