import {Pressable} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import {contentCenter} from '../utils/styles';
import CustomText from './CustomText';
import {pixelSizeHorizontal, pixelSizeVertical} from '../utils/responsive';
import {PrimaryButtonProps} from '../types/propTypes';

export default function PrimaryButton({
  label,
  onPress,
  buttonStyle,
  labelStyle,
  varient = 'Primary',
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        varient === 'Secondary' && styles.buttonSecondary,
        disabled && styles.disbaled,
        buttonStyle,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <CustomText
        fontSize={14}
        color="Black"
        fontFamily="Roboto-Bold"
        lineHeight={20}
        style={[styles.label, labelStyle]}>
        {label}
      </CustomText>
    </Pressable>
  );
}

const styles = EStyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: pixelSizeHorizontal(22),
    paddingVertical: pixelSizeVertical(7),
    borderRadius: '3rem',
    ...contentCenter,
  },
  label: {
    textTransform: 'uppercase',
  },
  buttonSecondary: {
    backgroundColor: colors.White,
    borderWidth: 1,
  },
  disbaled: {
    backgroundColor: '#ACACAC',
  },
});
