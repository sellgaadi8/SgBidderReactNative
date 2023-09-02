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
    data: Vehicle;
  };
  EditProfile: undefined;
  ExploreStack: undefined;
  OrderChart: {vehicleData: Vehicle};
  DealLost: {data: Vehicle[]};
  ImageViewerCarousel: {
    data: {key: string; value: string}[];
    index: number;
  };
  SuccessPage: undefined;
  OrderStack: {activeIndex: number};
};

type BottomStackParamList = {
  ExploreStack: undefined;
  MyCarStack: undefined;
  OrderStack: undefined;
  ProfileStack: undefined;
};
