import React from 'react';
import Box from './Box';
import Video from 'react-native-video';
import EStyleSheet from 'react-native-extended-stylesheet';
import {pixelSizeVertical} from '../utils/responsive';
import {contentCenter} from '../utils/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable} from 'react-native';

export default function VideoPlayer({video, onPressClose}: VideoPlayerProps) {
  return (
    <Box style={styles.container}>
      <Video
        source={{uri: video}}
        style={styles.video}
        resizeMode="contain"
        controls
      />
      <Pressable style={styles.icon} onPress={onPressClose}>
        <Icon name="close-circle" color="#FFFFFF" size={20} />
      </Pressable>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#000000',
    ...contentCenter,
    zIndex: 10,
  },
  video: {
    height: pixelSizeVertical(600),
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
});
