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

type AppColors = 'Primary' | 'White' | 'Black' | '#000000' | '#FFFFFF';

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
