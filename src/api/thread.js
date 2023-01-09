import axios from 'axios';
import {
  THREAD_URL,
  THREAD_CREATE_URL,
  TAG_URL,
  THREAD_UPDATE_URL,
  VOTE_URL,
} from './const';
import {getConfig} from '../utils/config';

export const fetchThreadsApi = (params) => {
  return axios.get(THREAD_URL,{params});
};

export const fetchTagsApi = () => {
  return axios.get(TAG_URL);
};

export const fetchThreadApi = (thread,params) => {
  return axios.get(THREAD_URL + thread, {params},getConfig());
};

export const createThreadApi = newThread => {
  return axios.post(THREAD_CREATE_URL, newThread, getConfig());
};

export const updateVoteThreadApi = data => {
  return axios.post(THREAD_URL+VOTE_URL, data, getConfig());
};

// for version:1, update thread partially
export const updateThreadApi = (id, data) => {
  return axios.patch(THREAD_URL + id + THREAD_UPDATE_URL, data, getConfig());
};

// export const updateThreadApi = (id, data) => {
//   return axios.patch(THREAD_URL + id + THREAD_UPDATE_URL, data, getConfig());
// };