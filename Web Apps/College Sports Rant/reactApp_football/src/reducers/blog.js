import { BLOG_PAGE_LOADED, BLOG_PAGE_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case BLOG_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case BLOG_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
