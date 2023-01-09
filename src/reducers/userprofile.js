import {
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
  } from '../actions/const';
  
  const initialState = {
    isLoading: false,
    name: null,
    email: null,
    twitter: null,
    github: null,
    date_joined: null,
    last_login: null,
    threads: [],
    likes:[],
    dislikes:[],
    error: null,
  };
  
  const userProfile = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_PROFILE_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case FETCH_USER_PROFILE_SUCCESS:
        return {
          isLoading: false,
          name: action.name,
          email: action.email,
          twitter: action.twitter,
          github: action.github,
          date_joined: action.date_joined,
          last_login: action.last_login,
          threads: action.threads,
          likes: action.likes,
          dislikes: action.dislikes,
          error: null,
        };
      case FETCH_USER_PROFILE_FAILURE:
        return {
          ...initialState,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default userProfile;
  