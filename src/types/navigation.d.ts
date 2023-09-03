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
  EditProfile: {title: string | null | undefined};
  ExploreStack: undefined;
  OrderChart: {vehicleData: Vehicle};
  DealLost: {data: Vehicle[]};
  ImageViewerCarousel: {
    data: {index: number; key: string; value: string}[];
    title: string;
  };
  SuccessPage: undefined;
  OrderStack: {activeIndex: number};
  ProfileStack: undefined;
};

type BottomStackParamList = {
  ExploreStack: undefined;
  MyCarStack: undefined;
  OrderStack: undefined;
  ProfileStack: undefined;
};
