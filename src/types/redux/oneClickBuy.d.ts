type ONE_CLICK_BUY = 'sgSeller/oneClickBuy';

type OneClickBuyState = {
  success: boolean;
  called: boolean;
  error: boolean;
  message: string;
};

type OneClickBuyAction = {
  type: ONE_CLICK_BUY;
  payload: OneClickBuyState;
};
