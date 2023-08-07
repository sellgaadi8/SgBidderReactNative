import axiosInstance from '../../axios';
import {CITY_LIST} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {AppDispatch} from '../store';

const CITY: CITY = 'sgSeller/city';

const initialState: CityState = {
  called: false,
  success: false,
  error: false,
  data: [],
};

export default (state = initialState, action: CityAction): CityState => {
  switch (action.type) {
    case CITY:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const cityAction = (res: CityState): CityAction => {
  return {type: CITY, payload: {...res, called: true}};
};

export const getCityList = () => async (dispatch: AppDispatch) => {
  const url = CITY_LIST;

  axiosInstance
    .get(url)
    .then(res => {
      dispatch(cityAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._repsonse) {
        dispatch(
          cityAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
