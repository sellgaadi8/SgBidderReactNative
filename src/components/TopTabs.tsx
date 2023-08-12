import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import colors from '../utils/colors';
import {contentCenter} from '../utils/styles';
import CustomText from './CustomText';
import RectButtonCustom from './RectButtonCustom';

type TopTabsProps = {
  tabs: {title: string; onPress: () => void}[];
  activeIndex: number;
};

const {width} = Dimensions.get('screen');

export default function TopTabs({tabs, activeIndex}: TopTabsProps) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring((width / 2) * activeIndex);
  }, [activeIndex, translateX]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);

  return (
    <View style={styles.row}>
      {tabs.map((el, idx) => {
        return (
          <View key={idx} style={styles.tab}>
            <RectButtonCustom
              key={idx}
              onPress={el.onPress}
              style={styles.touchable}>
              <CustomText
                color={idx === activeIndex ? '#FFFFFF' : '#5D5D5D'}
                fontFamily={
                  idx === activeIndex ? 'Roboto-Bold' : 'Roboto-Medium'
                }
                fontSize={15}>
                {el.title}
              </CustomText>
            </RectButtonCustom>
          </View>
        );
      })}

      <View style={styles.lineContainer}>
        <Animated.View style={[styles.line, animatedStyles]} />
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  row: {flexDirection: 'row', position: 'relative'},
  tab: {
    width: '50%',
  },
  touchable: {
    padding: '1rem',
    paddingVertical: '1.2rem',
    ...contentCenter,
  },
  lineContainer: {
    width: '50%',
    position: 'absolute',
    ...contentCenter,
    bottom: 0,
  },
  line: {
    width: width / 2,
    backgroundColor: colors.secondary,
    height: 3,
  },
});
