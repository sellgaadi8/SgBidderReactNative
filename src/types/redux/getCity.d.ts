type CITY = 'sgSeller/city';

type City = {
  id: string;
  city: string;
  state: string;
};

type CityState = {
  success: boolean;
  data: City[];
  called: boolean;
  error: boolean;
};

type CityAction = {
  type: CITY;
  payload: CityState;
};
