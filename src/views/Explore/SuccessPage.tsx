/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {SuccessPageProps} from '../../types/propTypes';

export default function SuccessPage({navigation}: SuccessPageProps) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BottomNavigation');
    }, 2000);
  }, []);

  return (
    <Box style={styles.container}>
      <LottieView
        source={require('../../assets/success.json')}
        autoPlay
        loop
        style={styles.image}
      />
      <CustomText color="#111111" fontSize={24} fontFamily="Roboto-Bold">
        Bid successfully placed!
      </CustomText>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: 120, width: 120},
});
