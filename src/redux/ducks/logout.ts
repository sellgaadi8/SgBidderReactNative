import axiosInstance from '../../axios';
import {LOGOUT_URL} from '../../utils/api';
import Globals from '../../utils/globals';
import {handleError} from '../../utils/helper';
import {
  deleteUserToken,
  getUserToken,
  saveTokenValidity,
} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const LOGOUT: LOGOUT = 'sgSeller/logout';

const initialState: LogoutState = {
  success: false,
  message: '',
  error: false,
  called: false,
};

export default (state = initialState, action: LogoutAction): LogoutState => {
  switch (action.type) {
    case LOGOUT:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const logoutAction = (res: LogoutState): LogoutAction => {
  return {type: LOGOUT, payload: {...res, called: true}};
};

export const onLogout = () => async (dispatch: AppDispatch) => {
  const url = LOGOUT_URL;

  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .post(url, '', config)
    .then(res => {
      dispatch(logoutAction({...res.data, error: false}));
      deleteUserToken();
      Globals.instance().setTokenValidity(-1);
      saveTokenValidity(-1);
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._response) {
        dispatch(
          logoutAction({
            ...JSON.parse(err.request._response),
            error: true,
          }),
        );
      }
    });
};
