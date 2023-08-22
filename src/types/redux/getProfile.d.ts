type GET_PROFILE_DETAILS = 'sgSeller/getProfile';

type Profile = {
  dealership_name: string;
  dealership_address: string;
  mobile: string;
  alternate_mobile: string;
  gst_no: string | null;
  business_pan: string;
  aadhar_no: string | null;
};

type GetProfileState = {
  success: boolean;
  called: boolean;
  error: boolean;
  data: Profile | null;
};

type GetProfileAction = {
  type: GET_PROFILE_DETAILS;
  payload: GetProfileState;
};
