import axiosInstance from '../../axios';
import {LOGIN_SEND_OTP} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {AppDispatch} from '../store';

const SEND_OTP: SEND_OTP = 'sgSeller/sendOtp';

const initialState: SendOtpState = {
  success: false,
  message: '',
  error: false,
  called: false,
};

export default (state = initialState, action: SendOtpAction): SendOtpState => {
  switch (action.type) {
    case SEND_OTP:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const sendOtpAction = (res: SendOtpState): SendOtpAction => {
  return {type: SEND_OTP, payload: {...res, called: true}};
};

export const onSendOtp = (phone: string) => (dispatch: AppDispatch) => {
  const url = LOGIN_SEND_OTP;

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const body = new FormData();

  body.append('phone', phone);

  axiosInstance
    .post(url, body, config)
    .then(res => {
      dispatch(sendOtpAction({...res.data, error: false}));
    })
    .catch(err => {
      console.log(err, 'err');

      if (err?.request?._repsonse) {
        handleError(err, dispatch);
        dispatch(
          sendOtpAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      } else if (err?.message) {
        dispatch(
          sendOtpAction({
            error: true,
            called: true,
            success: false,
            message: err.message,
          }),
        );
      }
    });
};
