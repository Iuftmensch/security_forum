import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_RESET,
  LOGOUT,
  REFRESH_FIREBASE_TOKEN
} from '../actions/const';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  username: null,
  name: null,
  email: null,
  github: null,
  twitter: null,
  date_joined : null,
  last_login : null,
  token: null,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.token,
        username: action.username,
        name: action.name,
        email: action.email,
        github: action.github,
        twitter: action.twitter,
        date_joined : action.date_joined,
        last_login : action.last_login,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        like: action.like?action.like.map(obj => obj.id):state.like,
        like_post: action.like_post?action.like_post.map(obj => obj.id):state.like_post,
        like_detail: action.like||state.like_detail,
        dislike: action.dislike?action.dislike.map(obj => obj.id):state.dislike,
        dislike_post: action.dislike_post?action.dislike_post.map(obj => obj.id):state.dislike_post,
        dislike_detail: action.dislike||state.dislike_detail,
        github: action.github || state.github,
        twitter: action.twitter || state.twitter,
        name: action.name || state.name,
      };
    case REFRESH_FIREBASE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        UPDATEError: action.error,
      };
    case UPDATE_PROFILE_RESET:
      return {
        ...state,
      };
    case LOGIN_RESET:
      return {
        ...initialState,
      };
    case LOGOUT:
      return initialState; //TODO: why not {...initialState}
    default:
      return state;
  }
};

export default auth;

