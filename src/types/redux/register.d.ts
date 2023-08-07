type REGISTER = 'sgSeller/register';

type RegisterState = {
  called: boolean;
  success: boolean;
  message: string;
};

type RegisterAction = {
  type: REGISTER;
  payload: RegisterState;
};
