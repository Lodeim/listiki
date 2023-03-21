export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";
export const GET_POSTS_STARTED = "GET_POSTS_STARTED";

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const getPostsFailed = (error) => ({
  type: GET_POSTS_FAILED,
  payload: error,
});

export const getPostsStarted = () => ({
  type: GET_POSTS_STARTED,
});


