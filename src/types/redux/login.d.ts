type LOGIN = 'sgSeller/login';

type LoginState = {
  success: boolean;
  called: boolean;
  message: string;
  error: boolean;
  name: string | null;
  token: string | null;
  is_register: number | null;
};

type LoginAction = {
  type: LOGIN;
  payload: LoginState;
};
