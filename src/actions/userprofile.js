import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from './const';
import {fetchUserProfileApi} from '../api/user';
import {apiErrorHandler} from '../utils/errorhandler';

export const fetchUserProfile = username => dispatch => {
  dispatch(fetchUserProfileRequest());

  fetchUserProfileApi(username)
    .then(response => {
      dispatch(fetchUserProfileSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchUserProfileFailure(errorMessage));
    });
};

export const fetchUserProfileRequest = () => {
  return {
    type: FETCH_USER_PROFILE_REQUEST,
  };
};

export const fetchUserProfileSuccess = data => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    name: data.name,
    email: data.email,
    twitter: data.twitter,
    github: data.github,
    date_joined: data.date_joined,
    last_login: data.last_login,
    threads: data.threads,
    likes: data.likes,
    dislikes: data.dislikes
  };
};

export const fetchUserProfileFailure = error => {
  return {
    type: FETCH_USER_PROFILE_FAILURE,
    error,
  };
};
