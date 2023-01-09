import axios from 'axios';
import {
  USER_LOGIN_URL,
  USER_LOGOUT_URL,
  USER_REGISTER_URL,
  USER_URL,
  USER_UPDATE_URL,
  SUBSCRIPTION_URL
} from './const';
import { getConfig } from '../utils/config';

export const loginApi = (token) => {
  return axios.post(USER_LOGIN_URL, null, {
    headers: { Authorization: 'Token ' + token },
  });
};

export const logoutApi = () => {
  return axios.post(USER_LOGOUT_URL, null, getConfig());
};

export const registerApi = data => {
  return axios.post(USER_REGISTER_URL, data, getConfig());
};

export const fetchUserProfileApi = username => {
  return axios.get(USER_URL + username, getConfig());
};

// for version1,update user partially
export const updateProfileApi = (username, newProfile) => {
  return axios.patch(
    USER_URL + username + USER_UPDATE_URL,
    newProfile,
    getConfig(),
  );
};

export const subsciptionApi = data =>{
  return axios.post(SUBSCRIPTION_URL,data,getConfig());
}