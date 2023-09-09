import {AxiosError} from 'axios';
import axiosInstance from '../../axios';
import {LOGIN_SUBMIT} from '../../utils/api';
import {handleError, postAuth} from '../../utils/helper';
import {AppDispatch} from '../store';
import messaging from '@react-native-firebase/messaging';

const LOGIN: LOGIN = 'sgSeller/login';

const initialState: LoginState = {
  success: false,
  message: '',
  error: false,
  called: false,
  name: '',
  token: null,
  is_register: null,
};

export default (state = initialState, action: LoginAction): LoginState => {
  switch (action.type) {
    case LOGIN:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const loginAction = (res: LoginState): LoginAction => {
  return {type: LOGIN, payload: {...res, called: true}};
};

export const onLogin =
  (
    phone: string,
    otp: string,
    role: string,
    isOtp: boolean,
    password: string,
  ) =>
  (dispatch: AppDispatch) => {
    const url = LOGIN_SUBMIT;

    const token = messaging().getToken();
    console.log('token=>>>>>', token);

    const body = JSON.stringify({
      phone: phone,
      otp: otp,
      role: role,
      isOtp: isOtp,
      password: password,
      device_token: token,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(loginAction({...res.data, error: false}));
        if (res.data.token) {
          postAuth(res.data.token);
        }
      })
      .catch((error: AxiosError) => {
        handleError(error, dispatch);
        if (error.request._response) {
          dispatch(
            loginAction({
              ...JSON.parse(error.request._response),
              error: true,
            }),
          );
        }
      });
  };
