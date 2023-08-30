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
    status?: string;
    highetBid?: string;
  };
  EditProfile: undefined;
  ExploreStack: undefined;
  OrderChart: {vehicleData: Vehicle};
  DealLost: undefined;
  ImageViewerCarousel: {
    data: {key: string; value: string}[];
    index: number;
  };
};

type BottomStackParamList = {
  ExploreStack: undefined;
  MyCarStack: undefined;
  OrderStack: undefined;
  ProfileStack: undefined;
};
