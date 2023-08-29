import axiosInstance from '../../axios';
import {LOST_DEAL} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const DEAL_LOST: DEAL_LOST = 'sgSeller/dealLost';

const initialState: DealLostState = {
  called: false,
  success: false,
  error: false,
  data: null,
};

export default (
  state = initialState,
  action: DealLostAction,
): DealLostState => {
  switch (action.type) {
    case DEAL_LOST:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const dealLostAction = (res: DealLostState): DealLostAction => {
  return {type: DEAL_LOST, payload: {...res, called: true}};
};

export const getDealLostList = () => async (dispatch: AppDispatch) => {
  const url = LOST_DEAL;
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
      dispatch(dealLostAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._repsonse) {
        dispatch(
          dealLostAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
