/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import RectButtonCustom from '../../components/RectButtonCustom';
import {Dimensions, Image, Pressable, ScrollView, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../utils/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageSectionProps} from '../../types/propTypes';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ImageSection({navigation, route}: ImageSectionProps) {
  const tabs = [
    {title: 'Exterior', onPress: () => onChangeTab(0)},
    {title: 'Interior', onPress: () => onChangeTab(1)},
    {title: 'Damages', onPress: () => onChangeTab(2)},
  ];
  const [play, setPlay] = useState(false);
  const {damages, exterior, interior, selectedIndex} = route.params;
  const [ldength, setDlength] = useState(0);
  const [data, setData] = useState<{
    [key: string]: {value: string; image: string} | string;
  }>();
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  function onChangeTab(index: number) {
    setActiveIndex(index);
  }

  const translateX = useSharedValue(0);

  useEffect(() => {
    setData(interior);
    let l1 = 0;
    if (damages) {
      Object.entries(damages).map(el => {
        if (typeof el[1] === 'object') {
          l1 = el[1].image.length;
        }
        setDlength(l1);
      });
    }
  }, []);

  useEffect(() => {
    if (activeIndex === 0) {
      setData(exterior);
    } else if (activeIndex === 1) {
      setData(interior);
    } else if (activeIndex === 2) {
      setData(damages);
    }
  }, [activeIndex]);

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
                  {/* {el.title === 'Damages' && damages && ldength} */}
                </CustomText>
              </RectButtonCustom>
            </View>
          );
        })}
      </View>
      <View style={styles.lineContainer}>
        <Animated.View style={[styles.line, animatedStyles]} />
      </View>
      <ScrollView>
        {data &&
          Object.entries(data).map((el, index) => {
            return (
              <Box key={index.toString()}>
                {typeof el[1] === 'object' &&
                el[1]?.image.includes('mp4') &&
                el[0] === 'engine_sound_video' ? (
                  <>
                    <Video
                      source={{
                        uri: el[1].image,
                      }}
                      style={styles.image}
                      resizeMode="cover"
                      paused={!play}
                      repeat={true}
                    />
                    <Pressable
                      style={styles.play}
                      onPress={() => setPlay(!play)}>
                      <Ionicons
                        name={!play ? 'play' : 'pause'}
                        color="#FFFFFF"
                        size={30}
                      />
                    </Pressable>
                  </>
                ) : typeof el[1] === 'string' && el[1]?.includes('mp4') ? (
                  <>
                    <Video
                      source={{
                        uri: el[1],
                      }}
                      style={styles.image}
                      resizeMode="cover"
                      paused={!play}
                      repeat={true}
                      muted={false}
                    />
                    <Pressable
                      style={styles.play}
                      onPress={() => setPlay(!play)}>
                      <Ionicons
                        name={!play ? 'play' : 'pause'}
                        color="#FFFFFF"
                        size={30}
                      />
                    </Pressable>
                  </>
                ) : typeof el[1] === 'object' ? (
                  el[0] !== 'engine_sound' && (
                    <Image
                      source={{
                        uri: el[1].image,
                      }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  )
                ) : (
                  el[1].includes('https') && (
                    <Image
                      source={{
                        uri: el[1],
                      }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  )
                )}
                {typeof el[1] === 'object' && el[0] !== 'engine_sound' && (
                  <View style={styles.imageview}>
                    <CustomText
                      color="#FFFFFF"
                      fontFamily="Roboto-Bold"
                      fontSize={18}
                      lineHeight={26}>
                      {el[0]
                        .split('_')
                        .map(
                          word => word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')}
                    </CustomText>
                  </View>
                )}
                {typeof el[1] === 'string' && el[1].includes('https') && (
                  <View style={styles.imageview}>
                    <CustomText
                      color="#FFFFFF"
                      fontFamily="Roboto-Bold"
                      fontSize={18}
                      lineHeight={26}>
                      {el[0]
                        .split('_')
                        .map(
                          word => word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ')}
                    </CustomText>
                  </View>
                )}
              </Box>
            );
          })}
      </ScrollView>
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
  imageview: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  play: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 3,
    width: width,
    marginBottom: 10,
  },
});
