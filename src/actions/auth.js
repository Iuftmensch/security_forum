import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  LOGOUT,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_RESET,
} from './const';
import { loginApi, logoutApi, fetchUserProfileApi, updateProfileApi } from '../api/user';
import { hideModal } from './modal';
import { apiErrorHandler } from '../utils/errorhandler';
import store from '../store';
import { app } from '../containers/modal/login'
import { switchPage } from './home';
import { refreshToken, checkFirebase } from './firebase';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (token, data) => {
  return {
    type: LOGIN_SUCCESS,
    token: token,
    username: data.username,
    email: data.email,
    github: data.github,
    twitter: data.twitter,
    date_joined: data.date_joined,
    last_login: data.last_login,
    name: data.name,
  };
};

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const loginReset = () => {
  return {
    type: LOGIN_RESET,
  };
};

export const login = (token) => dispatch => {
  dispatch(loginRequest());

  loginApi(token)
    .then(response => {
      dispatch(loginSuccess(token, response.data));
      dispatch(hideModal());
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(loginFailure(errorMessage));
    });
};

export const logout = () => dispatch => {
  // logoutApi();
  app.auth().signOut().then(res => {
    dispatch({
      type: LOGOUT,
    });
    dispatch(switchPage(1));
  }).catch((err) => {
    console.log(err);
  })

};

export const updateProfile = newProfile => dispatch => {
  const promise = checkFirebase();
  if (promise) {
    promise.then(response => {
      dispatch(UPDATEProfileRequest());
      const username = store.getState().auth.username;
      updateProfileApi(username, newProfile)
        .then(response => {
          dispatch(UPDATEProfileSuccess(response.data));
        })
        .catch(error => {
          const errorMessage = apiErrorHandler(error);
          dispatch(UPDATEProfileFailure(errorMessage));
        });
    });
  }
};


export const UPDATEProfileRequest = () => {
  return {
    type: UPDATE_PROFILE_REQUEST,
  };
};

export const UPDATEProfileSuccess = newProfile => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    like: newProfile.like,
    dislike: newProfile.dislike,
    github: newProfile.github,
    twitter: newProfile.twitter,
    name: newProfile.name,
  };
};

export const UPDATEProfileFailure = error => {
  return {
    type: UPDATE_PROFILE_FAILURE,
    error,
  };
};

export const UPDATEProfileReset = () => {
  return {
    type: UPDATE_PROFILE_RESET,
  };
};

