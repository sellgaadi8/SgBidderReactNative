import axiosInstance from '../../axios';
import {OCB_URL} from '../../utils/api';

import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const ONE_CLICK_BUY: ONE_CLICK_BUY = 'sgSeller/oneClickBuy';

const initialState: OneClickBuyState = {
  called: false,
  success: false,
  error: false,
  message: '',
};

export default (
  state = initialState,
  action: OneClickBuyAction,
): OneClickBuyState => {
  switch (action.type) {
    case ONE_CLICK_BUY:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const placeBidAction = (res: OneClickBuyState): OneClickBuyAction => {
  return {type: ONE_CLICK_BUY, payload: {...res, called: true}};
};

export const onOCB = (id: string) => async (dispatch: AppDispatch) => {
  const url = OCB_URL;
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const body = new FormData();
  body.append('id', id);

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
