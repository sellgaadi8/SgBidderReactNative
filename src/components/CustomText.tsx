import React, {useMemo} from 'react';
import {Text, TextProps} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import colors from '../utils/colors';

const FONT_SCALE = 0.3;
const FONT_OFFSET = 1;

export default function CustomText({
  children,
  ...props
}: CustomTextProps & TextProps) {
  const fontSize = useMemo(() => {
    switch (props.fontSize) {
      case 10:
        return moderateScale(10 - FONT_OFFSET, FONT_SCALE);
      case 11:
        return moderateScale(11 - FONT_OFFSET, FONT_SCALE);
      case 12:
        return moderateScale(12 - FONT_OFFSET, FONT_SCALE);
      case 13:
        return moderateScale(13 - FONT_OFFSET, FONT_SCALE);
      case 14:
        return moderateScale(14 - FONT_OFFSET, FONT_SCALE);
      case 15:
        return moderateScale(15 - FONT_OFFSET, FONT_SCALE);
      case 16:
        return moderateScale(16 - FONT_OFFSET, FONT_SCALE);
      case 17:
        return moderateScale(17 - FONT_OFFSET, FONT_SCALE);
      case 18:
        return moderateScale(18 - FONT_OFFSET, FONT_SCALE);
      case 20:
        return moderateScale(20 - FONT_OFFSET, FONT_SCALE);
      case 22:
        return moderateScale(22 - FONT_OFFSET, FONT_SCALE);
      case 24:
        return moderateScale(24 - FONT_OFFSET, FONT_SCALE);
      case 25:
        return moderateScale(25 - FONT_OFFSET, FONT_SCALE);
      case 34:
        return moderateScale(34 - FONT_OFFSET, FONT_SCALE);
      default:
        return moderateScale(16 - FONT_OFFSET, FONT_SCALE);
    }
  }, [props.fontSize]);

  const color = useMemo(() => {
    switch (props.color) {
      case 'Primary':
        return colors.primary;
      case 'White':
        return '#FFFFFF';
      case 'Black':
        return '#000000';
      default:
        return props.color;
    }
  }, [props.color]);

  const fontFamily = useMemo(() => {
    if (!props.fontFamily) {
      return 'Roboto-Regular';
    }
    return props.fontFamily;
  }, [props.fontFamily]);

  const lineHeight = useMemo(() => {
    if (props.lineHeight) {
      return moderateScale(props.lineHeight, FONT_SCALE);
    }
  }, [props.lineHeight]);

  return (
    <Text
      accessible={true}
      allowFontScaling={false}
      testID="Text-test-id"
      accessibilityLabel="accessLabelText"
      accessibilityActions={[{name: 'ACTION_NAME', label: 'ACTION_LABEL'}]}
      {...props}
      style={[{fontSize, fontFamily, lineHeight, color}, props.style]}>
      {children}
    </Text>
  );
}
