import axiosInstance from '../../axios';
import {getVehicleDetailsUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const GET_VEHICLE_DETAIL: GET_VEHICLE_DETAIL = 'sgSeller/getVehicleDetail';

const initialState: GetVehicleDetailState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: GetVehicleDetailAction,
): GetVehicleDetailState => {
  switch (action.type) {
    case GET_VEHICLE_DETAIL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const getVehicleDetailAction = (
  res: GetVehicleDetailState,
): GetVehicleDetailAction => {
  return {type: GET_VEHICLE_DETAIL, payload: {...res, called: true}};
};

export const onGetVehicleDetails =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getVehicleDetailsUrl(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(getVehicleDetailAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            getVehicleDetailAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
