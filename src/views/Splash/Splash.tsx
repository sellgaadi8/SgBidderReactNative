import {View, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {getUserToken} from '../../utils/localStorage';
import GlobalContext from '../../contexts/GlobalContext';
import EStyleSheet from 'react-native-extended-stylesheet';
import Box from '../../components/Box';
import {contentCenter} from '../../utils/styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../utils/colors';

export default function Splash({navigation}: SplashProps) {
  const {setAuthenticated} = useContext(GlobalContext);

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Login');
  //   }, 1000);
  // }, []);

  async function getToken() {
    const token = await getUserToken();
    console.log('====>', token);

    if (token) {
      setAuthenticated(true);
    } else {
      navigation.navigate('Login');
    }
  }
  return (
    <Box style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../../assets/logo.png')}
          resizeMode="contain"
        />
        {/* <CustomText
          fontFamily="Roboto-Medium"
          fontSize={16}
          color="White"
          style={styles.title}>
        </CustomText> */}
      </View>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    position: 'relative',
    ...contentCenter,
  },
  image: {width: wp('65%'), height: hp('32%')},
  content: {...contentCenter},
  title: {top: 30},
});
