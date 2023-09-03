import axiosInstance from '../../axios';
import {getCarStatus} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const CAR_STATUS: CAR_STATUS = 'sgSeller/carStatus';

const initialState: CarStatusState = {
  called: false,
  success: false,
  error: false,
  data: [],
};

export default (
  state = initialState,
  action: CarStatusAction,
): CarStatusState => {
  switch (action.type) {
    case CAR_STATUS:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const carStatusAction = (res: CarStatusState): CarStatusAction => {
  return {type: CAR_STATUS, payload: {...res, called: true}};
};

export const getCarStatusDetail =
  (id: string) => async (dispatch: AppDispatch) => {
    const url = getCarStatus(id);
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axiosInstance
      .get(url, config)
      .then(res => {
        dispatch(carStatusAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            carStatusAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
