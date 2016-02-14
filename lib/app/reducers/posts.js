import { FETCH_ALLPOSTS, FETCH_ALLPOSTS_SUCCESS } from '../actions/posts';

/*
 * Posts reducer manages fetching posts
 * @returns {Object} a new (posts object) part of the application state tree
 */

export default function posts(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case FETCH_ALLPOSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_ALLPOSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        [action.vertical]: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}
