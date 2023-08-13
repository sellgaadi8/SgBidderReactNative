type MODEL = 'sgSeller/model';

type ModelState = {
  success: boolean;
  data: string[];
  called: boolean;
  error: boolean;
};

type ModelAction = {
  type: MODEL;
  payload: ModelState;
};
