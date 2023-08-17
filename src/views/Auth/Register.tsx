/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
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
import Input from '../../components/Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch} from 'react-redux';
// import Snackbar from 'react-native-snackbar';
import Loader from '../../components/Loader';
import Snackbar from 'react-native-snackbar';
import {useAppSelector} from '../../utils/hook';
import {onLogin} from '../../redux/ducks/login';
import {onRegister} from '../../redux/ducks/register';
import GlobalContext from '../../contexts/GlobalContext';

export default function Register({navigation}: RegisterProps) {
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>();
  const selectRegister = useAppSelector(state => state.register);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const selectLogin = useAppSelector(state => state.login);
  const {setUserPhone} = useContext(GlobalContext);

  const dispatch = useDispatch<any>();

  function onSubmit() {
    Keyboard.dismiss();
    setShowOtp(true);
    const isValid = validateInputs();
    if (isValid) {
      if (!showOtp) {
        setLoading(true);
        dispatch(onRegister(phone));
        setUserPhone(phone);
      } else {
        setLoading(true);
        dispatch(onLogin(phone, otp, 'bidder', true, ''));
      }
    }
  }

  function validateInputs() {
    const tempErrors: RegisterErrors = {};

    if (phone.length < 10) {
      tempErrors.phone = 'Enter a valid phone';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  useEffect(() => {
    if (selectRegister.called) {
      setLoading(false);
      const {message, success} = selectRegister;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectLogin.called) {
      setLoading(false);
      const {message, success} = selectLogin;
      if (success) {
        // navigation.navigate('CreatePassword');
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectRegister]);

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <KeyboardAvoidingView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
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
                value={phone}
                onChangeText={setPhone}
                error={errors?.phone}
                maxLength={10}
                noMargin
                // editable={!showOtp}
              />
              {showOtp && (
                <Input
                  label="Otp"
                  showTextButton={true}
                  value={otp}
                  onChangeText={setOtp}
                  error={errors?.otp}
                  noMargin
                />
              )}
            </Box>
            <Box alignSelf="center" mv={'5%'}>
              <PrimaryButton
                label={showOtp ? 'Submit' : 'Next'}
                onPress={onSubmit}
              />
            </Box>
            <Box flexDirection="row" justifyContent="center">
              <CustomText
                color="#111111"
                fontFamily="Roboto-Regular"
                fontSize={14}
                lineHeight={22}>
                Have an accout?{'  '}
              </CustomText>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <CustomText
                  color="#111111"
                  fontFamily="Roboto-Medium"
                  fontSize={14}
                  lineHeight={20}
                  style={{textDecorationLine: 'underline'}}>
                  Login
                </CustomText>
              </Pressable>
            </Box>
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
    height: pixelSizeVertical(130),
    width: pixelSizeHorizontal(120),
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
  picker: {width: '100%', color: '#111111', fontSize: 12},
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ACACAC',
  },
});

//name , phone, city, email, sellertype : two three four
