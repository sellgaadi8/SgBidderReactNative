import axiosInstance from '../../axios';
import {RESET_PASSWORD} from '../../utils/api';
import {AppDispatch} from '../store';

const CHANGE_PASSWORD: CHANGE_PASSWORD = 'sgSeller/changePassword';

const initialState: ChangePasswordState = {
  called: false,
  success: false,
  error: false,
  message: null,
};

export default (
  state = initialState,
  action: ChangePasswordAction,
): ChangePasswordState => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const changePasswordAction = (
  res: ChangePasswordState,
): ChangePasswordAction => {
  return {type: CHANGE_PASSWORD, payload: {...res, called: true}};
};

export const onChangePassword =
  (phone: string, new_password: string, old_password: string) =>
  (dispatch: AppDispatch) => {
    const url = RESET_PASSWORD;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const body = new FormData();

    body.append('phone', phone);
    body.append('new_password', new_password);
    if (old_password) {
      body.append('old_password', old_password);
    }
    body.append('role', 'bidder');

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(changePasswordAction({...res.data, error: false}));
      })
      .catch(err => {
        if (err?.request?._repsonse) {
          dispatch(
            changePasswordAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
