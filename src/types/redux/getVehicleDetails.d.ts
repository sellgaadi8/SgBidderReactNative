type GET_VEHICLE_DETAIL = 'sgSeller/getVehicleDetail';

type Car_Images = {
  video: string | null;
  centre_back: string;
  centre_front: string;
  meter_console: string;
  engine_hood_open: string;
  right_corner_back: string;
  interior_dashboard: string;
  left_wheel_corner_front: string;
};

type VehicleDetail = {
  display_info: {
    make: string;
    color: string;
    model: string;
    variant: string;
    mfg_year: string;
    reg_date: string;
    fuel_type: string;
    no_of_kms: string;
    no_of_owners: string;
    transmission: string;
  };
  car_images: Car_Images;
  car_docs: {
    [key: string]: {value: string; image: string} | string;
  };
  exterior_img: {
    [key: string]: {value: string; image: string} | string;
  };
  external_panel: {
    [key: string]: {value: string; image: string} | string;
  };
  tyres: {
    [key: string]: {value: string; image: string};
  };
  engine: {
    [key: string]: {value: string; image: string} | string | null;
  };
  handling_and_suspension: {[key: string]: {value: string; image: string}};
  electricals: {
    [key: string]: {value: string; image: string};
  };
  steering: {
    [key: string]: {value: string; image: string};
  };
  vehicle: {
    auction_ends_at: string;
    auction_value: string;
    highest_bid: string;
    vehicle_status: string;
  };
};

type GetVehicleDetailState = {
  data: VehicleDetail | null;
  success: boolean;
  called: boolean;
  error: boolean;
};

type GetVehicleDetailAction = {
  type: GET_VEHICLE_DETAIL;
  payload: GetVehicleDetailState;
};

type VehicleImageType = {
  value: string;
  image: string;
};
