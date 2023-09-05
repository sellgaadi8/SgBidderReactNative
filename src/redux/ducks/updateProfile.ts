import axiosInstance from '../../axios';
import {UPDATE_PROFILE} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const UPDATE_PROFILE_DETAILS: UPDATE_PROFILE_DETAILS = 'sgSeller/updateProfile';

const initialState: UpdateProfileState = {
  called: false,
  success: false,
  error: false,
  message: '',
};

export default (
  state = initialState,
  action: UpdateProfileAction,
): UpdateProfileState => {
  switch (action.type) {
    case UPDATE_PROFILE_DETAILS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const updateProfileAction = (res: UpdateProfileState): UpdateProfileAction => {
  return {type: UPDATE_PROFILE_DETAILS, payload: {...res, called: true}};
};

export const onUpdateProfile =
  (
    name: string,
    gst_no: string,
    pan_no: string,
    aadhar_no: string,
    email: string,
    address: string,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = UPDATE_PROFILE;
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('address', address);
    body.append('name', name);
    body.append('gst_no', gst_no);
    body.append('pan_no', pan_no);
    body.append('aadhar_no', aadhar_no);
    body.append('email', email);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(updateProfileAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            updateProfileAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
