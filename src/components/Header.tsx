import React from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../utils/colors';
import {Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import {pixelSizeHorizontal, pixelSizeVertical} from '../utils/responsive';
import {HeaderProps} from '../types/propTypes';
const {height} = Dimensions.get('window');

export default function Header({
  title,
  back,
  showIcon,
  headerProps: {navigation},
}: HeaderProps) {
  return (
    <Box style={styles.container}>
      {back && (
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backbutton}>
          <Icon name="arrow-left" size={25} color="#ffffff" />
        </Pressable>
      )}
      {showIcon ? (
        <Image source={require('../assets/HomeLogo.png')} style={styles.logo} />
      ) : (
        <CustomText
          color="White"
          fontSize={22}
          lineHeight={28}
          fontFamily="Roboto-Bold"
          style={styles.title}>
          {title}
        </CustomText>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: '1rem',
    paddingVertical: '0.8rem',
    elevation: 8,
    minHeight: height * 0.1,
    shadowRadius: 2,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    justifyContent: 'center',
  },
  title: {},
  logo: {
    height: pixelSizeVertical(60),
    width: pixelSizeHorizontal(58),
  },
  backbutton: {
    position: 'absolute',
    left: 10,
    top: 28,
  },
});
