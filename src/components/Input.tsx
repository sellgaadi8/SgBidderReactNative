/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {TextInput, TextInputProps} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import EStyleSheet from 'react-native-extended-stylesheet';
import {contentCenter} from '../utils/styles';
import Box from './Box';
import CustomText from './CustomText';
import colors from '../utils/colors';
import {fontPixel} from '../utils/responsive';
import TextButton from './TextButton';

export default function Input(props: TextInputProps & InputProps) {
  const {
    disableCopyPaste,
    callOnFocus,
    value,
    placeholder,
    keyboardType,
    textButton,
    showTextButton,
    error,
    noMargin,
    renderEndIcon,
    // endIcon,
    // endIconPress,
    label,
    // propsStyle,
    labelStyle,
    input,
  } = props;

  const [bottomOffset] = useState(13.5);
  const [leftOffset] = useState(15);
  const inputRef = useRef<TextInput>(null);
  const [highlight, setHighlight] = useState(false);
  const bottom = useSharedValue(bottomOffset);
  const left = useSharedValue(leftOffset);
  const [isLabelFloating, setLabelFloating] = useState(false);
  const [selection, setSelection] = useState({start: 0, end: 0});

  useEffect(() => {
    if (value && value?.length !== 0) {
      onFocus();
    }
  }, [value]);

  function onFocus() {
    bottom.value = withTiming(bottomOffset + 27.5, {duration: 200});
    left.value = withTiming(leftOffset - 5, {duration: 200});
    setHighlight(true);
    setLabelFloating(true);
    callOnFocus && callOnFocus();
  }

  function onBlur() {
    if (value?.length === 0) {
      setLabelFloating(false);
      bottom.value = withTiming(bottomOffset, {duration: 200});
      left.value = withTiming(leftOffset, {duration: 200});
    }
    setHighlight(false);
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {bottom: bottom.value, left: left.value};
  });

  return (
    <Box style={[styles.container, noMargin && styles.noMargin]}>
      <Box style={styles.inputContainer}>
        {label && (
          <Animated.Text
            style={[
              styles.label,
              isLabelFloating && styles.floatingLabel,
              animatedStyles,
              labelStyle,
              {zIndex: isLabelFloating ? 1 : 0},
            ]}>
            {label}
          </Animated.Text>
        )}
        <TextInput
          contextMenuHidden={disableCopyPaste}
          onSelectionChange={
            disableCopyPaste
              ? e => {
                  const {start} = e.nativeEvent.selection;
                  setSelection({start, end: start});
                }
              : undefined
          }
          selection={disableCopyPaste ? selection : undefined}
          placeholder={placeholder}
          ref={inputRef}
          placeholderTextColor="#919191"
          style={[
            styles.input,
            !noMargin && styles.marginBottom,
            highlight && styles.focused,
            error && styles.inputError,
            // editable === false && styles.disabled,
            input,
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          {...props}
        />
      </Box>

      <Box style={styles.row}>
        {error && (
          <CustomText
            fontSize={12}
            style={[styles.error, !noMargin && styles.top]}>
            {error}
          </CustomText>
        )}
        {showTextButton && textButton && (
          <TextButton
            {...textButton}
            containerStyles={[
              styles.link,
              textButton.containerStyles,
              error && styles.marginTop,
            ]}
            labelStyles={textButton.labelStyles}
          />
        )}
      </Box>
      {/* Render custom end icon */}
      {renderEndIcon && renderEndIcon()}
      {/* Pass the name of the icon */}
      {/* {endIcon !== undefined ? (
        <Box style={[styles.icon, noMargin && styles.noMarginIcon, propsStyle]}>
          <IconButton
            size={18}
            onPress={endIconPress}
            icon={endIcon}
            color={colors.primary}
          />
        </Box>
      ) : null} */}
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    marginBottom: hp('2%'),
    ...contentCenter,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#79747E',
    width: '100%',
    paddingHorizontal: wp('5%'),
    borderRadius: '0.5rem',
    fontSize: fontPixel(16),
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
    color: colors.textColor,
    backgroundColor: 'transparent',
    height: 50,
  },
  focused: {
    borderColor: '#000000',
  },
  link: {marginLeft: 'auto'},
  top: {top: -8},
  inputError: {borderColor: 'red'},
  row: {
    flexDirection: 'row',
    alignitems: 'center',
    width: '100%',
  },
  marginTop: {
    marginTop: '1.5rem',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  noMarginIcon: {
    height: '40%',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: -5,
    height: '60%',
    width: '20%',
    zIndex: 2,
    ...contentCenter,
  },
  disabled: {
    borderColor: '#FFF',
    borderBottomWidth: 2,
    borderRadius: '0.6rem',
  },
  label: {
    fontSize: fontPixel(12),
    lineHeight: 18,
    fontFamily: 'Roboto-Medium',
    color: colors.primary,
    backgroundColor: colors.White,
    position: 'absolute',
    paddingRight: '0.2rem',
    paddingLeft: '0.2rem',
  },
  floatingLabel: {
    fontSize: fontPixel(12),
    color: colors.primary,
  },
});
