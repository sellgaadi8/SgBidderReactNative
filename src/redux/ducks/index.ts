import {combineReducers} from 'redux';

import login from './login';
import sendOtp from './sendOtp';
import register from './register';
import getCity from './getCity';

export default combineReducers({
  login,
  sendOtp,
  register,
  getCity,
});
