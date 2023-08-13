import axiosInstance from '../../axios';
import {LOGIN_SUBMIT} from '../../utils/api';
import {handleError, postAuth} from '../../utils/helper';
import {AppDispatch} from '../store';

const LOGIN: LOGIN = 'sgSeller/login';

const initialState: LoginState = {
  success: false,
  message: '',
  error: false,
  called: false,
  name: null,
  token: null,
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

    const body = JSON.stringify({
      phone: phone,
      otp: otp,
      role: role,
      isOtp: isOtp,
      password: password,
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
      .catch(err => {
        // handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            loginAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        } else if (err?.msg || err?.message) {
          dispatch(
            loginAction({
              error: true,
              called: true,
              success: false,
              message: err.message,
              name: null,
              token: null,
            }),
          );
        }
      });
  };
