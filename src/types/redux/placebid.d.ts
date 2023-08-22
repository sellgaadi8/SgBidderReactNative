type ON_PLACE_BID = 'sgSeller/placeBid';

type PlaceBidState = {
  success: boolean;
  called: boolean;
  error: boolean;
  message: string;
};

type PlaceBidAction = {
  type: ON_PLACE_BID;
  payload: PlaceBidState;
};
