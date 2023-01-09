import {combineReducers} from 'redux';
import auth from './auth';
import modal from './modal';
import register from './register';
import home from './home';
import thread from './thread';
import filter from './filter';
import nav from './nav';
import userProfile from './userprofile';
import subscribe from './subscribe';
import sort from './sort';

const rootReducer = combineReducers({
  auth,
  modal,
  register,
  home,
  thread,
  filter,
  nav,
  userProfile,
  subscribe,
  sort
});

export default rootReducer;
