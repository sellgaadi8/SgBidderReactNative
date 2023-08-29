type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  // CreatePassword: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  BottomNavigation: undefined;
  VehicleDetail: {
    title: string;
    vehicleId: string;
    auctionValue: string | null;
    isOrder: boolean;
  };
  EditProfile: undefined;
  ExploreStack: undefined;
  OrderChart: {vehicleData: Vehicle};
  DealLost: undefined;
};

type BottomStackParamList = {
  ExploreStack: undefined;
  MyCarStack: undefined;
  OrderStack: undefined;
  ProfileStack: undefined;
};
