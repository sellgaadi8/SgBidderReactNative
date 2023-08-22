import {Image, Pressable} from 'react-native';
import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Video from 'react-native-video';

export default function PopulateImageWithData({
  title,
  value,
  image,
  onPressImage,
  onPressVideo,
}: TyresImagesProps) {
  return (
    <Box style={value && styles.title}>
      {value && (
        <>
          <Box style={!image && styles.row}>
            <CustomText style={styles.dataValue}>{title}</CustomText>
            <CustomText style={styles.value}>{value}</CustomText>
          </Box>
          {value !== 'MAJOR SOUND' ? (
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
          {/* {video && (
            <Pressable onPress={onPressImage} style={{borderWidth: 1}}>
              <Video
                source={{uri: video}}
                style={styles.images}
                resizeMode="cover"
                paused={false}
                repeat={true}
              />
            </Pressable>
          )} */}
        </>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: '3%',
  },
  dataValue: {
    color: '#111111',
    fontFamily: 'Roboto-Medium',
    lineHeight: 22,
    fontSize: 15,
  },
  value: {
    fontFamily: 'Roboto-Bold',
    color: '#34A02C',
    lineHeight: 22,
    fontSize: 14,
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
