import axiosInstance from '../../axios';
import {VARIANT_LIST} from '../../utils/api';
import {handleError} from '../../utils/helper';
import {getUserToken} from '../../utils/localStorage';
import {AppDispatch} from '../store';

const VARIANT: VARIANT = 'sgSeller/variant';

const initialState: VariantState = {
  called: false,
  success: false,
  error: false,
  data: [],
};

export default (state = initialState, action: VariantAction): VariantState => {
  switch (action.type) {
    case VARIANT:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

const variantAction = (res: VariantState): VariantAction => {
  return {type: VARIANT, payload: {...res, called: true}};
};

export const getVariantList =
  (make: string, model: string) => async (dispatch: AppDispatch) => {
    const url = VARIANT_LIST;
    const token = await getUserToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const body = new FormData();
    body.append('make', make);
    body.append('model', model);

    axiosInstance
      .post(url, body, config)
      .then(res => {
        dispatch(variantAction({...res.data, error: false}));
      })
      .catch(err => {
        handleError(err, dispatch);
        if (err?.request?._response) {
          dispatch(
            variantAction({
              ...JSON.parse(err.request._response),
              error: true,
            }),
          );
        }
      });
  };
