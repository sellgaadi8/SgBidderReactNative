type CAR_STATUS = 'sgSeller/carStatus';

type Status = {
  id: number;
  status: string;
  extra_info: string;
  created_at: string;
};

type CarStatusState = {
  success: boolean;
  data: Status[];
  called: boolean;
  error: boolean;
};

type CarStatusAction = {
  type: CAR_STATUS;
  payload: carStatusState;
};
