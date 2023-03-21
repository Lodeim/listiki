import { GET_PHOTOS_STARTED } from "../actionCreators/photos";
import {
  GET_POSTS_FAILED,
  GET_POSTS_SUCCESS,
} from "../actionCreators/postsByUser";

const initialState = {
  posts: [],
  isPostsLoading: true,
  isPostsError: false,
};
export const postsByUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS_STARTED:
      return {
        ...state,
        isPostsLoading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isPostsLoading: false,
        posts: action.payload,
        isPostsError: false,
      };
    case GET_POSTS_FAILED:
      return {
        ...state,
        isPostsLoading: false,
        isPostsError: true,
      };
    default:
      return {
        ...state,
      };
  }
};
