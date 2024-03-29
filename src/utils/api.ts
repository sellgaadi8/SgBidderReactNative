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
const GET_PROFILE = '/getProfileDetails';
const PLACE_BID_URL = '/place_bid';
const OCB_URL = '/buy_now';
const LOST_DEAL = '/vehicle/getDealsLost';

const getVehicleUrl = (
  vehicle_status: string,
  vehicle_make: string,
  vehicle_type: string,
  page_no: number,
  show_my_bids: boolean,
  vehicle_model: string,
) =>
  `/vehicle/list?vehicle_status=${vehicle_status}&vehicle_make=${vehicle_make}&vehicle_type=${vehicle_type}&page_no=${page_no}&show_my_bids=${show_my_bids}&vehicle_model=${vehicle_model}`;

const getVehicleDetailsUrl = (id: string) => `/vehicle/getVehicleDetails/${id}`;
const getCarStatus = (id: string) => `/vehicle/getStatusHistory/${id}`;

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
  GET_PROFILE,
  PLACE_BID_URL,
  OCB_URL,
  LOST_DEAL,
  getVehicleUrl,
  getVehicleDetailsUrl,
  getCarStatus,
};
