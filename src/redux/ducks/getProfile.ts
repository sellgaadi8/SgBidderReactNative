import axiosInstance from '../../axios';
import {GET_PROFILE} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_PROFILE_DETAILS: GET_PROFILE_DETAILS = 'sgSeller/getProfile';

const initialState: GetProfileState = {
  called: false,
  success: false,
  data: null,
  error: false,
};

export default (
  state = initialState,
  action: GetProfileAction,
): GetProfileState => {
  switch (action.type) {
    case GET_PROFILE_DETAILS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getProfileAction = (res: GetProfileState): GetProfileAction => {
  return {type: GET_PROFILE_DETAILS, payload: {...res, called: true}};
};

export const onGetProfile = () => async (dispatch: AppDispatch) => {
  const url = GET_PROFILE;
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(getProfileAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._repsonse) {
        dispatch(
          getProfileAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
