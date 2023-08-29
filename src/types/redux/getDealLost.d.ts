type DEAL_LOST = 'sgSeller/dealLost';

type LostDeal = {
  id: 10;
  auction_id: 20;
  user_id: 45;
  vehicle_id: 74;
  bid: '10000111';
  bid_won: -1;
  created_at: '2023-08-22T07:22:32.000000Z';
  updated_at: '2023-08-25T19:55:43.000000Z';
}[];

type DealLostState = {
  success: boolean;
  data: {
    deal_lost_data: LostDeal[];
    count: string;
  } | null;
  called: boolean;
  error: boolean;
};

type DealLostAction = {
  type: DEAL_LOST;
  payload: DealLostState;
};
