import {Image, Pressable} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Video from 'react-native-video';
import {TyresImagesProps} from '../types/propTypes';

export default function PopulateImageWithData({
  title,
  value,
  image,
  onPressImage,
  onPressVideo,
}: TyresImagesProps) {
  return (
    <>
      {title !== 'overall_rating' && value && (
        <Box style={value && styles.title}>
          <Box style={!image && styles.row}>
            <CustomText style={styles.dataValue}>
              {title.replace(/_/g, ' ').toUpperCase()}
            </CustomText>
            <CustomText style={styles.value}>
              {value.replace(/_/g, ' ').toUpperCase()}
            </CustomText>
          </Box>
          {value !== 'major_sound' ? (
            <Pressable onPress={onPressImage}>
              {image && <Image source={{uri: image}} style={styles.image} />}
            </Pressable>
          ) : (
            <Pressable onPress={onPressVideo}>
              {image && (
                <Video
                  source={{
                    uri: image,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                  paused={false}
                  repeat={true}
                  muted
                />
              )}
            </Pressable>
          )}
        </Box>
      )}
    </>
  );
}

const styles = EStyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: '3%',
    alignItems: 'center',
  },
  dataValue: {
    color: '#111111',
    fontFamily: 'Roboto-Regular',
    lineHeight: 22,
    fontSize: 14,
    // textTransform: 'capitalize',
  },
  value: {
    fontFamily: 'Roboto-Medium',
    color: '#34A02C',
    lineHeight: 22,
    fontSize: 13,
    textTransform: 'uppercase',
  },
  image: {height: 50, width: 50},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: '2%',
    alignSelf: 'center',
  },
});
