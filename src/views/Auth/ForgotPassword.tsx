import {Image} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import colors from '../../utils/colors';
import Input from '../../components/Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import PrimaryButton from '../../components/PrimaryButton';

export default function ForgotPassword({navigation}: ForgotPasswordProps) {
  function onSubmit() {
    navigation.navigate('Login');
  }

  return (
    <Box style={styles.container}>
      <Box>
        <Image
          source={require('../../assets/loginCircle.png')}
          style={styles.headerBg}
        />
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Box>
      <Box style={styles.body}>
        <CustomText
          color="#111111"
          fontFamily="Roboto-Bold"
          fontSize={22}
          lineHeight={28}>
          Forgot Password
        </CustomText>
        <Box style={styles.inputContainer}>
          <Input label="Mobile Number" keyboardType="numeric" />
        </Box>
        <Box width={'40%'} alignSelf="center" mv={10}>
          <PrimaryButton label="Submit" onPress={onSubmit} />
        </Box>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
    position: 'relative',
  },
  headerBg: {
    height: pixelSizeVertical(335),
    width: pixelSizeHorizontal(375),
  },
  logo: {
    height: pixelSizeVertical(135),
    width: pixelSizeHorizontal(125),
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  body: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('5%'),
  },
  inputContainer: {
    marginTop: '4rem',
  },
});
