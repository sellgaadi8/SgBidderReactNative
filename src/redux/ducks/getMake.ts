import axiosInstance from '../../axios';
import {MAKE_LIST} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const MAKE: MAKE = 'sgSeller/make';

const initialState: MakeState = {
  called: false,
  success: false,
  error: false,
  data: [],
};

export default (state = initialState, action: MakeAction): MakeState => {
  switch (action.type) {
    case MAKE:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const makeAction = (res: MakeState): MakeAction => {
  return {type: MAKE, payload: {...res, called: true}};
};

export const getMakeList = () => async (dispatch: AppDispatch) => {
  const url = MAKE_LIST;
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axiosInstance
    .get(url, config)
    .then(res => {
      dispatch(makeAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._repsonse) {
        dispatch(
          makeAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
