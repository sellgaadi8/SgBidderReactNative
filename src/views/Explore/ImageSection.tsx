import React, {useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import RectButtonCustom from '../../components/RectButtonCustom';
import {Dimensions, Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../utils/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageSectionProps} from '../../types/propTypes';

export default function ImageSection({navigation}: ImageSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {title: 'Exterior', onPress: () => onChangeTab(0)},
    {title: 'Interior', onPress: () => onChangeTab(1)},
    {title: 'Damages', onPress: () => onChangeTab(2)},
  ];

  function onChangeTab(index: number) {
    setActiveIndex(index);
  }

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring((width / 2.8) * activeIndex);
  }, [activeIndex, translateX]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);
  return (
    <Box style={styles.container}>
      <Pressable style={styles.close} onPress={() => navigation.goBack()}>
        <Icon name="close" size={30} color={colors.White} />
      </Pressable>
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
      </View>
      <View style={styles.lineContainer}>
        <Animated.View style={[styles.line, animatedStyles]} />
      </View>
    </Box>
  );
}

const styles = EStyleSheet.create({
  touchable: {
    padding: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2rem',
  },
  line: {
    width: width / 3.5,
    backgroundColor: colors.secondary,
    height: 3,
  },
  close: {
    marginLeft: 'auto',
    marginRight: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
});
