import React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import colors from '../utils/colors';

export default function Calendar({
  isOpen,
  onChange,
  value,
  maximumDate,
  minimumDate,
}: CalenderProps) {
  return (
    <>
      {isOpen ? (
        <RNDateTimePicker
          mode="date"
          value={value.toString().length !== 0 ? new Date(value) : new Date()}
          dateFormat="day month year"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={onChange}
          textColor={colors.primary}
          accentColor={colors.secondary}
          style={{backgroundColor: colors.secondary}}
        />
      ) : null}
    </>
  );
}
