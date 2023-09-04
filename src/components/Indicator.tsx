import React, {useEffect} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import colors from './../utils/colors';

type IndicatorProps = {
  index: number;
  length: number;
};

export default function Indicator({index, length}: IndicatorProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(wp('4.5%') * index);
  }, [translateX, index]);

  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  }, []);

  return (
    <View style={styles.indicator}>
      {Array(length - 1)
        .fill(0)
        .map((_, idx) => {
          return <View key={idx} style={styles.dot} />;
        })}
      <View style={[styles.dot, styles.noMargin]} />
      <Animated.View style={[styles.dot, styles.active, animatedStyles]} />
    </View>
  );
}

const styles = EStyleSheet.create({
  indicator: {
    position: 'relative',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dot: {
    height: '0.7rem',
    width: '0.7rem',
    backgroundColor: '#DCDCDC',
    marginEnd: '1rem',
    borderRadius: '3rem',
  },
  active: {
    position: 'absolute',
    left: -5,
    backgroundColor: colors.secondary,
    width: '1.6rem',
  },
  noMargin: {margin: 0},
});
