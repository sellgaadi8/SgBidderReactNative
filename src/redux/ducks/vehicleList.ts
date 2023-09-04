import axiosInstance from '../../axios';
import {getVehicleUrl} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const VEHICLE_LIST: VEHICLE_LIST = 'sgSeller/vehicleList';

const initialState: VehicleListState = {
  called: false,
  success: false,
  data: null,
  error: false,
};

export default (
  state = initialState,
  action: VehicleListAction,
): VehicleListState => {
  switch (action.type) {
    case VEHICLE_LIST:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const vehicleListAction = (res: VehicleListState): VehicleListAction => {
  return {type: VEHICLE_LIST, payload: {...res, called: true}};
};

export const onGetVehicleList =
  (
    status: string,
    model: string,
    vehicle_type: string,
    page: number,
    show_my_bids: boolean,
  ) =>
  async (dispatch: AppDispatch) => {
    const url = getVehicleUrl(status, model, vehicle_type, page, show_my_bids);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(vehicleListAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            vehicleListAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
