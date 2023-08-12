type AlertOptions = {
  title: string;
  desc: string;
  close: (waitFor: number) => void;
  actions: {
    title: string;
    onPress: () => void;
    mode: 'SUCCESS' | 'DELETE';
    component: any;
  }[];
};

type ON_GLOBAL_CHANGE = 'campaigner/global';

type GlobalState = {
  isFormEdited?: boolean;
  alert?: null | AlertOptions;
  showBottomTabs?: boolean;
  called?: boolean;
};

type GlobalAction = {
  payload: GlobalState;
  type: ON_GLOBAL_CHANGE;
};
