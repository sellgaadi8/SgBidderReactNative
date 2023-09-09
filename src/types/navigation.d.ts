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
    data: {
      value: string;
      image: string;
      key: string;
      index: number;
    }[];
    index: number;
  };
  SuccessPage: {msg: string};
  OrderStack: {activeIndex: number};
  ProfileStack: undefined;
  ImageSection: {
    exterior:
      | {[key: string]: {value: string; image: string} | string}
      | undefined;
    interior:
      | {[key: string]: {value: string; image: string} | string}
      | undefined;
    damages:
      | {[key: string]: {value: string; image: string} | string}
      | undefined;
    selectedIndex: number;
  };
  Notification: undefined;
};

type BottomStackParamList = {
  ExploreStack: undefined;
  MyCarStack: undefined;
  OrderStack: undefined;
  ProfileStack: undefined;
};
