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
    // rto: string;
    // chasis_no: {
    //   value: string;
    //   image: string;
    // };
    // insurance: string;
    // permit_upto: string;
    // fitness_upto: string;
    // duplicate_key: {
    //   value: string;
    //   image: string;
    // };
    // rc_noc_issued: string;
    // road_tax_paid: {
    //   value: string;
    //   image: string;
    // };
    // mismatch_in_rc: string;
    // cng_lpg_fitment: string;
    // rc_availability: {
    //   value: string;
    //   image: string;
    // };
    // partipeshi_request: {
    //   value: string;
    //   image: string;
    // };
    // under_hypothication: string;
    // cng_lpg_fitment_endorsed_on_rc: string;
  };
  exterior_img: {
    [key: string]: {value: string; image: string} | string;
    // boot_floor: {
    //   value: string;
    //   image: string;
    // };
    // left_apron: {
    //   value: string;
    //   image: string;
    // };
    // right_apron: {
    //   value: string;
    //   image: string;
    // };
    // right_pillarC: {
    //   value: string;
    //   image: string;
    // };
    // left_apron_leg: {
    //   value: string;
    //   image: string;
    // };
    // right_apron_leg: {
    //   value: string;
    //   image: string;
    // };
    // left_pillarA: {
    //   value: string;
    //   image: string;
    // };
    // left_pillarB: {
    //   value: string;
    //   image: string;
    // };
    // left_pillarC: {
    //   value: string;
    //   image: string;
    // };
    // right_pillarA: {
    //   value: string;
    //   image: string;
    // };
    // right_pillarB: {
    //   value: string;
    //   image: string;
    // };
  };
  external_panel: {
    [key: string]: {value: string; image: string} | string;
    // roof: {
    //   value: string;
    //   image: string;
    // };
    // bonnet_head: {
    //   value: string;
    //   image: string;
    // };
    // dickey_door: {
    //   value: string;
    //   image: string;
    // };
    // left_fender: {
    //   value: string;
    //   image: string;
    // };
    // right_fender: {
    //   value: string;
    //   image: string;
    // };
    // left_door_back: {
    //   value: string;
    //   image: string;
    // };
    // left_door_front: {
    //   value: string;
    //   image: string;
    // };
    // right_door_back: {
    //   value: string;
    //   image: string;
    // };
    // right_door_front: {
    //   value: string;
    //   image: string;
    // };
    // left_quater_panel: {
    //   value: string;
    //   image: string;
    // };
    // right_quater_panel: {
    //   value: string;
    //   image: string;
    // };
  };
  tyres: {
    [key: string]: {value: string; image: string};

    // spare_type: {
    //   value: string;
    //   image: string;
    // };
    // spare_image: {
    //   value: string;
    //   image: string;
    // };
    // lhs_back_type: {
    //   value: string;
    //   image: string;
    // };
    // rhs_back_type: {
    //   value: string;
    //   image: string;
    // };
    // lhs_back_image: {
    //   value: string;
    //   image: string;
    // };
    // lhs_front_type: {
    //   value: string;
    //   image: string;
    // };
    // rhs_back_image: {
    //   value: string;
    //   image: string;
    // };
    // rhs_front_type: {
    //   value: string;
    //   image: string;
    // };
    // lhs_front_image: {
    //   value: string;
    //   image: string;
    // };
    // rhs_front_image: {
    //   value: string;
    //   image: string;
    // };
  };
  engine: {
    [key: string]: {value: string; image: string} | string | null;
    // ac: string;
    // heater: string;
    // cooling: string;
    // condensor: string;
    // exhaust_smoke: string;
    // engine_mounting: string;
    // gear_oil_leakage: string;
    // engine_sound_video: {
    //   value: string;
    //   image: string;
    // };
    // clutch_bearing_sound: string;
    // engine_perm_blow_back: string;
  };
  handling_and_suspension: {[key: string]: {value: string; image: string}};
  electricals: {
    [key: string]: {value: string; image: string};
    // overall: {
    //   value: string;
    //   image: string;
    // };
    // music_system: {
    //   value: string;
    //   image: string;
    // };
    // jack_tool_box: {
    //   value: string;
    //   image: string;
    // };
    // power_windows: {
    //   value: string;
    //   image: string;
    // };
    // parking_sensor: {
    //   value: string;
    //   image: string;
    // };
    // electrical_odomoter: {
    //   value: string;
    //   image: string;
    // };
    // lights_crack_broken: {
    //   value: string;
    //   image: string;
    // };
  };
  steering: {
    [key: string]: {value: string; image: string};
    // brake: {
    //   value: string;
    //   image: string;
    // };
    // steering: {
    //   value: string;
    //   image: string;
    // };
    // suspension: {
    //   value: string;
    //   image: string;
    // };
    // wheel_bearing_noise: {
    //   value: string;
    //   image: string;
    // };
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
