import {
  GET_USER_FAILED,
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_AUTHORIZED_USER_SUCCESS,
  GET_AUTHORIZED_USER_STARTED,
  GET_AUTHORIZED_USER_FAILED,
  MUTATE_USER_STARTED,
  MUTATE_USER_SUCCESS,
} from "../actionCreators/users";

const initialState = {
  user: {},
  isUserLoading: true,
  authorizedUser: undefined,
  isAuthorizedUserLoading: true,
  isAuthorizedUserError: false,
  isUserError: false,
  isMutateLoading: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STARTED:
      return {
        ...state,
        isUserLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        user: action.payload,
        isUserError: false,
      };
    case GET_USER_FAILED:
      return {
        ...state,
        isUserLoading: false,
        isUserError: true,
      };
    case GET_AUTHORIZED_USER_SUCCESS:
      return {
        ...state,
        authorizedUser: action.payload,
        isAuthorizedUserLoading: false,
        isAuthorizedUserError: false,
      };
    case GET_AUTHORIZED_USER_STARTED:
      return {
        ...state,
        isAuthorizedUserLoading: true,
      };
    case GET_AUTHORIZED_USER_FAILED:
      return {
        ...state,
        isAuthorizedUserLoading: false,
        isAuthorizedUserError: true,
      };
    case MUTATE_USER_STARTED:
      return {
        ...state,
        isMutateLoading: true,
      };
    case MUTATE_USER_SUCCESS:
      return {
        ...state,
        isMutateLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
