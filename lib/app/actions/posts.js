/**
 *  IMPORTANT: Dispatch 3 actions for any API request
 *  1. action informing the reducers that the request began - toggle isFetching flag
 *  2. action informing the reducers that the request finished - toggle isFetching flag
 *  3. action informing the reducers that the request failed - reset the isFetching flag
 */

import fetch from 'isomorphic-fetch';


/*
 * Action creators for network request to fetch all posts
 */
export const FETCH_ALLPOSTS = 'FETCH_ALLPOSTS';
function fetchAllPosts(vertical = 'realfuture') {
  return {
    type: FETCH_ALLPOSTS,
    vertical
  };
}

export const FETCH_ALLPOSTS_SUCCESS = 'FETCH_ALLPOSTS_SUCCESS';
function fetchAllPostsSuccess(vertical, json) {
  return {
    type: FETCH_ALLPOSTS_SUCCESS,
    vertical,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export const FETCH_ALLPOSTS_FAILURE = 'FETCH_ALLPOSTS_FAILURE';
function fetchAllPostsFailure(vertical) {
  return {
    type: FETCH_ALLPOSTS_FAILURE,
    vertical
  };
}

/*
 * Redux thunk action creator
 */
export function fetchPosts(vertical) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API to fetch posts has started.
    //  Action 1: request to fetch began
    dispatch(fetchAllPosts(vertical));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.
    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return fetch(``)
      .then((response) => {
        if (response.status >= 400) {
          //  Action 3: request to fetch posts has failed
          dispatch(fetchAllPostsFailure(vertical));
        }
        return response.json();
      })
      .then(json => {
        //  Update the app state with the results of the API call.
        //  Action 2: request to fetch posts is successful
        dispatch(fetchAllPostsSuccess(vertical, json));
      });
  };
}
