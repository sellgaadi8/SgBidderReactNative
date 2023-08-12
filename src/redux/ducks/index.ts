import {combineReducers} from 'redux';

import login from './login';
import sendOtp from './sendOtp';
import register from './register';
import getCity from './getCity';
import global from './global';
import vechicleList from './vehicleList';

export default combineReducers({
  login,
  sendOtp,
  register,
  getCity,
  global,
  vechicleList,
});
