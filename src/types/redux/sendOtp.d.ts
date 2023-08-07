type SEND_OTP = 'sgSeller/sendOtp';

type SendOtpState = {
  success: boolean;
  called: boolean;
  message: string;
  error: boolean;
};

type SendOtpAction = {
  type: SEND_OTP;
  payload: SendOtpState;
};
