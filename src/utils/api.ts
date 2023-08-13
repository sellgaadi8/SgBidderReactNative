const LOGIN_SEND_OTP = '/getOtp';
const LOGIN_SUBMIT = '/login';
const REGISTER_USER = '/register';
const CITY_LIST = '/getCityList';
const MAKE_LIST = '/vehicle/make';
const MODEL_LIST = '/vehicle/model';
const VARIANT_LIST = '/vehicle/variant';
const RESET_PASSWORD = '/changePassword';
const UPDATE_PROFILE = '/updateProfileDetails';
const LOGOUT_URL = '/logout';

const getVehicleUrl = (
  vehicle_status: string,
  vehicle_make: string,
  vehicle_type: string,
) =>
  `/vehicle/list?vehicle_status=${vehicle_status}&vehicle_make=${vehicle_make}&vehicle_type=${vehicle_type}`;

export {
  LOGIN_SEND_OTP,
  LOGIN_SUBMIT,
  REGISTER_USER,
  CITY_LIST,
  MAKE_LIST,
  MODEL_LIST,
  VARIANT_LIST,
  RESET_PASSWORD,
  UPDATE_PROFILE,
  LOGOUT_URL,
  getVehicleUrl,
};
