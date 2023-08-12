const LOGIN_SEND_OTP = '/getOtp';
const LOGIN_SUBMIT = '/login';
const REGISTER_USER = '/register';
const CITY_LIST = '/getCityList';
const getVehicleUrl = (
  vehicle_status: string,
  model: string,
  from: string,
  to: string,
) =>
  `/vehicle/list?vehicle_status=${vehicle_status}&model=${model}&from=${from}&to=${to}`;

export {LOGIN_SEND_OTP, LOGIN_SUBMIT, REGISTER_USER, CITY_LIST, getVehicleUrl};
