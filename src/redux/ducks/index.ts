import {combineReducers} from 'redux';

import login from './login';
import sendOtp from './sendOtp';
import register from './register';
import getCity from './getCity';
import global from './global';
import vechicleList from './vehicleList';
import getModal from './getModal';
import getMake from './getMake';
import getVariant from './getVariant';
import changePassword from './changePassword';
import updateProfile from './updateProfile';
import logout from './logout';
import getVehicleDetails from './getVehicleDetails';
import getProfile from './getProfile';
import placebid from './placebid';
import oneClickBuy from './oneClickBuy';
import getStatus from './getStatus';
import getDealLost from './getDealLost';

export default combineReducers({
  login,
  sendOtp,
  register,
  getCity,
  global,
  vechicleList,
  getModal,
  getMake,
  getVariant,
  changePassword,
  updateProfile,
  logout,
  getVehicleDetails,
  getProfile,
  placebid,
  oneClickBuy,
  getStatus,
  getDealLost,
});
