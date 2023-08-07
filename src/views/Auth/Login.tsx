import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import colors from '../../utils/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import TextButton from '../../components/TextButton';
import {useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import {onSendOtp} from '../../redux/ducks/sendOtp';
import {useAppSelector} from '../../utils/hook';
import Loader from '../../components/Loader';
import {onLogin} from '../../redux/ducks/login';

export default function Login({navigation}: LoginProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<LoginErrors>();
  const [showOtp, setShowOtp] = useState(false);
  const selectOtp = useAppSelector(state => state.sendOtp);
  const selectLogin = useAppSelector(state => state.login);

  const dispatch = useDispatch<any>();

  function onSubmit() {
    Keyboard.dismiss();
    const isValid = validateInputs();
    if (isValid) {
      if (!showOtp) {
        setLoading(true);
        dispatch(onSendOtp(mobile));
      } else {
        setLoading(true);
        dispatch(onLogin(mobile, true, password));
      }
    }
  }

  function validateInputs() {
    const tempErrors: LoginErrors = {};

    if (mobile.length < 10) {
      tempErrors.mobile = 'Enter a valid number';
    }
    if (showOtp && password.length === 0) {
      tempErrors.password = 'Enter a valid Otp';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  useEffect(() => {
    if (selectOtp.called) {
      setLoading(false);
      const {success, message} = selectOtp;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        setShowOtp(true);
      } else {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectLogin.called) {
      setLoading(false);
      const {message, success, name} = selectLogin;
      if (success && name && message) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectOtp, selectLogin]);

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Box>
            <Image
              source={require('../../assets/loginCircle.png')}
              style={styles.headerBg}
              // resizeMode=''
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
              Signup
            </CustomText>
            <Box style={styles.inputContainer}>
              <Input
                label="Mobile Number"
                keyboardType="numeric"
                value={mobile}
                onChangeText={setMobile}
                error={errors?.mobile}
                maxLength={10}
                noMargin
                editable={!showOtp}
              />
              {showOtp && (
                <Input
                  label="Otp"
                  showTextButton={true}
                  value={password}
                  onChangeText={setPassword}
                  error={errors?.password}
                  noMargin
                  // textButton={{
                  //   label: 'Login with OTP',
                  //   containerStyles: styles.link,
                  //   onPress: () => console.log('test'),
                  //   labelStyles: styles.labelButton,
                  // }}
                />
              )}
            </Box>
            <Box width={'40%'} alignSelf="center" mv={10}>
              <PrimaryButton label="Submit" onPress={onSubmit} />
            </Box>

            <Box flexDirection="row" justifyContent="center" pv={'2%'}>
              <CustomText
                color="#111111"
                fontFamily="Roboto-Regular"
                fontSize={14}
                lineHeight={22}>
                Don't Have Accout?{'  '}
              </CustomText>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <CustomText
                  color="#111111"
                  fontFamily="Roboto-Medium"
                  fontSize={14}
                  lineHeight={20}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{textDecorationLine: 'underline'}}>
                  Register
                </CustomText>
              </Pressable>
            </Box>
          </Box>
          <Box alignItems="center" mv={'7.5%'}>
            <TextButton
              label="Forgot password?"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
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
    height: pixelSizeVertical(316),
    width: pixelSizeHorizontal(352),
  },
  logo: {
    height: pixelSizeVertical(130),
    width: pixelSizeHorizontal(120),
    position: 'absolute',
    bottom: 50,
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
