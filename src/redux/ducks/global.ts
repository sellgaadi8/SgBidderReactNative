const ON_GLOBAL_CHANGE: ON_GLOBAL_CHANGE = 'campaigner/global';

const initialState: GlobalState = {
  alert: null,
  isFormEdited: false,
  showBottomTabs: true,
  called: false,
};

export default (state = initialState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case ON_GLOBAL_CHANGE:
      return {...state, ...action.payload};
    default:
      return {...state, called: false};
  }
};

export const onGlobalChange = (res: GlobalState): GlobalAction => {
  return {type: ON_GLOBAL_CHANGE, payload: {...res, called: true}};
};
