/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {fontPixel} from '../utils/responsive';
import CustomText from './CustomText';

export default function CustomDropdown({
  onValueChange,
  selectedValue,
  values,
  title,
  mode = 'dialog',
  error,
  isMandatory = false,
}: CustomDropdownProps) {
  return (
    <View style={styles.pickerContainer}>
      {title && (
        <Text style={styles.label}>
          {title}
          {isMandatory && <Text style={{color: 'red'}}>*</Text>}
        </Text>
      )}
      <View style={styles.picker}>
        <Picker
          mode={mode}
          style={styles.pickerItemStyle}
          onValueChange={onValueChange}
          selectedValue={selectedValue}>
          {values.map((el, index) => {
            return (
              <Picker.Item
                key={index}
                style={[styles.pickerItemStyle]}
                label={el.label}
                value={el.value}
                color="#1C1B1F"
                fontFamily="Roboto-Medium"
              />
            );
          })}
        </Picker>
      </View>
      {error && (
        <CustomText fontSize={12} style={[styles.error]}>
          {error}
        </CustomText>
      )}
    </View>
  );
}

const styles = EStyleSheet.create({
  pickerContainer: {
    marginBottom: '2rem',
  },
  picker: {
    backgroundColor: 'transparent',
    borderColor: '#79747E',
    borderWidth: 1,
    borderRadius: '0.5rem',
    height: 50,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    lineHeight: 28,
    fontFamily: 'Roboto-Regular',
    color: '#111111',
    marginBottom: '0.5rem',
  },
  pickerItemStyle: {
    fontSize: fontPixel(12),
    lineHeight: 18,
    fontFamily: 'Roboto-Medium',
    color: '#1C1B1F',
    padding: 0,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});
