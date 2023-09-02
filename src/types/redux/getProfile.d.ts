type GET_PROFILE_DETAILS = 'sgSeller/getProfile';

type Profile = {
  dealership_name: string | null;
  dealership_address: string | null;
  mobile: string;
  alternate_mobile: string | null;
  gst_no: string | null;
  business_pan: string | null;
  aadhar_no: string | null;
  email: string | null;
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
