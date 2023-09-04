/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {pixelSizeHorizontal, pixelSizeVertical} from '../../utils/responsive';
import colors from '../../utils/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import {onSendOtp} from '../../redux/ducks/sendOtp';
import {useAppSelector} from '../../utils/hook';
import Loader from '../../components/Loader';
import {onLogin} from '../../redux/ducks/login';
import GlobalContext from '../../contexts/GlobalContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LoginProps} from '../../types/propTypes';
import TextButton from '../../components/TextButton';
import OTPTimer from '../../components/OTPTimer';
import SmsRetriever from 'react-native-sms-retriever';

export default function Login({navigation}: LoginProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const [isPassword, setIsPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>();
  const [showOtp, setShowOtp] = useState(false);
  const selectOtp = useAppSelector(state => state.sendOtp);
  const selectLogin = useAppSelector(state => state.login);
  const [canRequestOtp, setCanRequestOtp] = useState(true);
  const [seconds, setSeconds] = useState('30');
  const [isAuto, setIsAuto] = useState(false);
  const {setAuthenticated, setIsFirstTime, setUserPhone} =
    useContext(GlobalContext);

  const dispatch = useDispatch<any>();

  function sendOtp() {
    setPassword('');
    setLoading(true);
    dispatch(onSendOtp(mobile));
    onSmsListenerPressed();
  }

  function onSubmit() {
    Keyboard.dismiss();
    const isValid = validateInputs();
    if (isValid) {
      if (!showOtp) {
        sendOtp();
      } else {
        setLoading(true);
        dispatch(onLogin(mobile, password, 'bidder', true, ''));
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
        setCanRequestOtp(false);
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
      const {message, success, is_register} = selectLogin;
      if (success && is_register === 0) {
        setIsFirstTime(false);
        setAuthenticated(true);
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else if (is_register === 1) {
        setUserPhone(mobile);
        setAuthenticated(true);
        setIsFirstTime(true);
        setTimeout(() => {
          navigation.navigate('EditProfile', {title: null});
        }, 1000);
      } else if (!success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectOtp, selectLogin]);

  function onEdit() {
    setShowOtp(false);
    setPassword('');
    setCanRequestOtp(true);
    setSeconds('');
  }

  async function onSmsListenerPressed() {
    try {
      const registered = await SmsRetriever.startSmsRetriever();

      if (registered) {
        setIsAuto(true);
        SmsRetriever.addSmsListener(_onReceiveSms);
      }
    } catch (error) {}
  }

  function _onReceiveSms(event: {message: string}) {
    const regex = /\b(\d{6}\s[A-Za-z0-9]{10,})\b/;
    const match = event.message.match(regex);

    if (match) {
      const otpWithLetters = match[1];
      const numericOTP = otpWithLetters.split(' ')[0];
      setPassword(numericOTP);
      setIsAuto(false);
    }
    SmsRetriever.removeSmsListener();
  }

  function onChangeT(text: string) {
    setIsAuto(false);
    SmsRetriever.removeSmsListener();
    setPassword(text);
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled">
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
              Signin
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
                renderEndIcon={
                  showOtp
                    ? () => {
                        return (
                          <Pressable onPress={onEdit} style={styles.eye}>
                            <Icon name="pencil" size={18} color="#111111" />
                          </Pressable>
                        );
                      }
                    : undefined
                }
              />

              {showOtp && (
                <Input
                  label="OTP"
                  showTextButton={true}
                  value={password}
                  keyboardType="numeric"
                  onChangeText={onChangeT}
                  error={errors?.password}
                  maxLength={6}
                  noMargin
                  textContentType="oneTimeCode"
                  renderEndIcon={
                    isAuto
                      ? () => {
                          return (
                            <Box style={styles.eye}>
                              <ActivityIndicator
                                size={'small'}
                                color={colors.secondary}
                              />
                            </Box>
                          );
                        }
                      : undefined
                  }
                />
              )}
            </Box>
            <Box width={'40%'} alignSelf="center" mv={10}>
              <PrimaryButton
                label={showOtp ? 'Submit' : 'Get Otp'}
                onPress={onSubmit}
              />
            </Box>

            {showOtp && (
              <Box alignItems="center">
                <Box flexDirection="row">
                  <CustomText
                    style={styles.resendOtpView}
                    fontSize={14}
                    lineHeight={19}
                    fontFamily="Roboto-Regular"
                    color="#111111">
                    Didn’t Get OTP?
                  </CustomText>
                  {!canRequestOtp && (
                    <CustomText
                      style={[styles.resendOtpView, {left: 5}]}
                      fontSize={14}
                      lineHeight={19}
                      fontFamily="Roboto-Regular"
                      color="#39A1EA">
                      {seconds} seconds
                    </CustomText>
                  )}
                </Box>
                {canRequestOtp && (
                  <TextButton
                    label={'Resend OTP'}
                    containerStyles={[styles.resendOtpView, {marginTop: 12}]}
                    labelStyles={styles.resendText}
                    onPress={canRequestOtp ? sendOtp : undefined}
                  />
                )}
              </Box>
            )}
            {!canRequestOtp && (
              <OTPTimer
                setSeconds={setSeconds}
                setCanRequestOtp={setCanRequestOtp}
              />
            )}
            {/* <Box flexDirection="row" justifyContent="center" pv={'2%'}>
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
            </Box> */}
          </Box>
          {/* <Box alignItems="center" mv={'7.5%'}>
            <TextButton
              label="Forgot password?"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </Box> */}
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
  eye: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
  resendOtpView: {
    top: 15,
  },
});
