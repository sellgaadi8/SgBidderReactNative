// import {RouteProp} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

// type LoginProps = {
//   navigation: StackNavigationProp<RootStackParamList, 'Login'>;
//   route: RouteProp<RootStackParamList, 'Login'>;
// };

type BoxProps = {
  children: React.ReactNode;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'center' | 'space-between';
  alignSelf?: 'center';
  height?: number | string;
  width?: number | string;
  p?: Spacing;
  m?: Spacing;
  pv?: Spacing;
  ph?: Spacing;
  mv?: Spacing;
  mh?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  style?: any;
};

type Spacing =
  | 5
  | 8
  | 10
  | 12
  | 15
  | 18
  | 20
  | 25
  | 30
  | 35
  | 40
  | 45
  | 50
  | string
  | number;

type CustomTextProps = {
  fontSize?: FontSize;
  color?: AppColors;
  lineHeight?: number;
  fontFamily?:
    | 'Roboto-Regular'
    | 'Roboto-Medium'
    | 'Roboto-Italic'
    | 'Roboto-Bold'
    | 'Roboto-BoldItalic'
    | 'Roboto-MediumItalic'
    | 'Poppins-Regular';
};

type FontSize =
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 20
  | 22
  | 24
  | 25
  | 34;

type AppColors =
  | 'Primary'
  | 'White'
  | 'Black'
  | '#000000'
  | '#FFFFFF'
  | '#111111'
  | '#FF0000'
  | 'rgba(157, 157, 157, 0.8)'
  | '#5D5D5D'
  | '#33A02C'
  | '#201A1B'
  | '#1C1B1F'
  | '#49454F';

type TextButtonProps = {
  label: string;
  onPress?: () => void;
  color?: string;
  borderColor?: string;
  fontSize?: string;
  containerStyles?: EStyleSheet.AnyObject;
  labelStyles?: EStyleSheet.AnyObject;
};

type InputProps = {
  disableCopyPaste?: boolean;
  callOnFocus?: () => any;
  textButton?: TextButtonProps;
  showTextButton?: boolean;
  error?: string;
  noMargin?: boolean;
  endIcon?: IconDefinition;
  endIconPress?: () => void;
  renderEndIcon?: () => any;
  label?: string;
  propsStyle?: ViewStyle;
  labelStyle?: ViewStyle;
  input?: ViewStyle;
};

type PrimaryButtonProps = {
  onPress: () => void;
  label: string;
  buttonStyle?: ViewStyle;
  labelStyle?: EStyleSheet.AnyObject;
  varient?: 'Primary' | 'Secondary';
  disabled?: boolean;
};

type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
  route: RouteProp<RootStackParamList, 'Login'>;
};

type LoaderProps = {
  status?: string;
};

type RegisterProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
  route: RouteProp<RootStackParamList, 'Register'>;
};

type ForgotPasswordProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
  route: RouteProp<RootStackParamList, 'ForgotPassword'>;
};

// type CreatePasswordProps = {
//   navigation: StackNavigationProp<RootStackParamList, 'CreatePassword'>;
//   route: RouteProp<RootStackParamList, 'CreatePassword'>;
// };

type TabLabelProps = {
  value: string;
  focused: boolean;
};

type ExploreProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ExploreStack'>;
  route: RouteProp<RootStackParamList, 'ExploreStack'>;
};

type VehicleCardProps = {
  data: Vehicle;
  onPlaceBid?: () => void;
  onPressView: () => void;
  isOrder?: boolean;
};

type CustomDropdownProps = {
  title?: string;
  selectedValue: any;
  onValueChange: (value: any, index: number) => void;
  values: {label: string; value: any}[];
  mode?: 'dialog' | 'dropdown';
  error?: string;
  isMandatory?: boolean;
};

type ModalType = 'Make' | 'Model' | 'Variant';

type SearchModalProps = {
  placeholder: string;
  data: string[];
  onPressSelecteItem: (selected: string, modalType: ModalType) => void;
  dataType: ModalType;
  query: string;
  onChangeText: (value: string) => void;
  onPressDone: () => void;
  showDone?: boolean;
};

type CalenderProps = {
  isOpen: boolean;
  onClosed: () => void;
  onChange: (event: Event | DateTimePickerEvent, date?: Date) => void;
  value: Date;
  maximumDate?: Date;
  minimumDate?: Date;
};

type SplashProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

type ProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

type HeaderProps = {
  headerProps: HeaderOptions;
  title?: string;
  back?: boolean;
  showIcon?: boolean;
};

type EditProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditProfile'>;
};

type CarFilterType = {
  modal: string;
  vehicleType: string;
};

type FilterProps = {
  onClosedFilter: () => void;
  onApplyFilter: (filters: CarFilterType) => void;
  filter: CarFilterType;
};

type VideoPlayerProps = {
  video: string;
  onPressClose: () => void;
};

type TyresImagesProps = {
  title: string;
  value: string | null;
  image?: string | null;
  video?: string | null;
  onPressImage?: () => void;
  onPressVideo?: (value: any) => void;
};

type VehicleDetailProps = {
  navigation: StackNavigationProp<RootStackParamList, 'VehicleDetail'>;
  route: RouteProp<RootStackParamList, 'VehicleDetail'>;
};

type OrdersProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Orders'>;
  route: RouteProp<RootStackParamList, 'Orders'>;
};

type EditProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'EditProfile'>;
  route: RouteProp<RootStackParamList, 'EditProfile'>;
};
