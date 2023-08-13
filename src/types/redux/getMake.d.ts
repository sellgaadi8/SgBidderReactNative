type MAKE = 'sgSeller/make';

type MakeState = {
  success: boolean;
  data: string[];
  called: boolean;
  error: boolean;
};

type MakeAction = {
  type: MAKE;
  payload: MakeState;
};
