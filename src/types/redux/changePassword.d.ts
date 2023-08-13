type CHANGE_PASSWORD = 'sgSeller/changePassword';

type ChangePasswordState = {
  success: boolean;
  called: boolean;
  message: string | null;
  error: boolean;
};

type ChangePasswordAction = {
  type: CHANGE_PASSWORD;
  payload: ChangePasswordState;
};
