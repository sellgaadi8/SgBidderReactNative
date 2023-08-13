import axiosInstance from '../../axios';
import {MODEL_LIST} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const MODEL: MODEL = 'sgSeller/model';

const initialState: ModelState = {
  called: false,
  success: false,
  error: false,
  data: [],
};

export default (state = initialState, action: ModelAction): ModelState => {
  switch (action.type) {
    case MODEL:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const modelAction = (res: ModelState): ModelAction => {
  return {type: MODEL, payload: {...res, called: true}};
};

export const getModelList = (make: string) => async (dispatch: AppDispatch) => {
  const url = MODEL_LIST;
  const token = await getUserToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const body = new FormData();
  body.append('make', make);

  axiosInstance
    .post(url, body, config)
    .then(res => {
      dispatch(modelAction({...res.data, error: false}));
    })
    .catch(err => {
      handleError(err, dispatch);
      if (err?.request?._repsonse) {
        dispatch(
          modelAction({
            ...JSON.parse(err.request._repsonse),
            error: true,
          }),
        );
      }
    });
};
