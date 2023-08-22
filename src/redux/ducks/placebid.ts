import axiosInstance from '../../axios';
import {PLACE_BID_URL} from '../../utils/api';

import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ON_PLACE_BID: ON_PLACE_BID = 'sgSeller/placeBid';

const initialState: PlaceBidState = {
  called: false,
  success: false,
  error: false,
  message: '',
};

export default (
  state = initialState,
  action: PlaceBidAction,
): PlaceBidState => {
  switch (action.type) {
    case ON_PLACE_BID:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const placeBidAction = (res: PlaceBidState): PlaceBidAction => {
  return {type: ON_PLACE_BID, payload: {...res, called: true}};
};

export const onPlaceVehicleBid =
  (id: string, bid: string) => async (dispatch: AppDispatch) => {
    const url = PLACE_BID_URL;
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('id', id);
    body.append('bid', bid);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(placeBidAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._repsonse) {
          dispatch(
            placeBidAction({
              ...JSON.parse(err.request._repsonse),
              error: true,
            }),
          );
        }
      });
  };
