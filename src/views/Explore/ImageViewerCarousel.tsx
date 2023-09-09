/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';

import colors from '../../utils/colors';
import {container, contentCenter} from '../../utils/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageViewerCarouselProps} from '../../types/propTypes';
import {PinchBox} from '../../components/PinchBox';

const {width, height} = Dimensions.get('screen');

export default function ImageViewerCarousel({route}: ImageViewerCarouselProps) {
  const {data, index: startingIndex} = route.params;

  const _caoursel = useRef<Carousel<any>>(null);

  const [currentIndex, setCurrentIndex] = useState(startingIndex);

  function _renderItem(item: {value: string; image: string; key: string}) {
    return (
      <View style={styles.itemContainer}>
        <PinchBox>
          <Animated.Image
            resizeMode="contain"
            source={{uri: item.image}}
            style={styles.item}
          />
        </PinchBox>
        <View style={[styles.indicatorContainer]}>
          <View style={[styles.row, data.length <= 1 && styles.center]}>
            {item.image.length > 1 && (
              <Pressable onPress={onPrev}>
                <Icon size={20} name="menu-left" />
              </Pressable>
            )}
            <Text style={styles.indicator}>
              {currentIndex + 1} / {data.length}
            </Text>
            {item.image.length > 1 && (
              <Pressable onPress={onNext}>
                <Icon onPress={onNext} size={20} name="menu-right" />
              </Pressable>
            )}
          </View>
          <Text
            style={{
              color: colors.White,
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              textTransform: 'capitalize',
            }}>
            {item.value.replace(/_/g, ' ')}
          </Text>
          <Text
            style={{
              color: colors.White,
              fontFamily: 'Roboto-Regular',
              fontSize: 14,
              textTransform: 'capitalize',
            }}>
            {item.key.replace(/_/g, ' ')}
          </Text>
        </View>
      </View>
    );
  }

  function onSnapToItem(index: number) {
    setCurrentIndex(index);
  }

  function onNext() {
    let idx = currentIndex + 1;

    if (currentIndex >= data.length - 1) {
      idx = 0;
    }
    _caoursel.current?.snapToItem(idx, true);
  }

  function onPrev() {
    let idx = currentIndex - 1;
    if (currentIndex <= 0) {
      idx = data.length - 1;
    }
    _caoursel.current?.snapToItem(idx, true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={_caoursel}
          loop={false}
          pagingEnabled={true}
          disableIntervalMomentum={true}
          onSnapToItem={onSnapToItem}
          enableSnap={true}
          slideStyle={styles.container}
          data={data}
          renderItem={({item}) => _renderItem(item)}
          sliderWidth={width}
          sliderHeight={height}
          itemHeight={height}
          firstItem={startingIndex}
          itemWidth={width}
          getItemLayout={(data, index) => ({
            offset: width * index,
            length: width,
            index,
          })}
        />
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {...container},
  indicatorContainer: {
    paddingHorizontal: '2rem',
    paddingTop: '1rem',
    marginTop: 'auto',
    backgroundColor: colors.primary,
    paddingBottom: '2rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {height: '100%', width: '100%', backgroundColor: 'black'},
  item: {height: '100%', width: '100%'},
  center: {...contentCenter},
  equalPadding: {paddingBottom: '1rem'},
  indicator: {alignSelf: 'center', color: colors.White},
  text: {
    color: colors.White,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textTransform: '',
  },
  length: {
    color: colors.primary,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
});
