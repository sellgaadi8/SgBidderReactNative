import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native-gesture-handler';

import colors from './../utils/colors';
import CustomText from './CustomText';

export default function TextButton({
  label,
  onPress,
  containerStyles,
  labelStyles,
}: TextButtonProps) {
  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity onPress={onPress}>
        <CustomText
          fontSize={12}
          color="White"
          lineHeight={16}
          style={[styles.label, labelStyles]}>
          {label}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {},
  label: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    textDecorationLine: 'underline',
  },
});
