type LOGIN = 'sgSeller/login';

type LoginState = {
  success: boolean;
  called: boolean;
  message: string | null;
  error: boolean;
  name: string | null;
  token: string | null;
};

type LoginAction = {
  type: LOGIN;
  payload: LoginState;
};
