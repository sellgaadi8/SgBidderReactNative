/* eslint-disable react-hooks/exhaustive-deps */
import {Image, KeyboardAvoidingView, Pressable, ScrollView} from 'react-native';
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
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {onChangePassword} from '../../redux/ducks/changePassword';
import GlobalContext from '../../contexts/GlobalContext';
import {useAppSelector} from '../../utils/hook';
import Snackbar from 'react-native-snackbar';

export default function CreatePassword({navigation}: CreatePasswordProps) {
  const dispatch = useDispatch<any>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<PasswordErrors>();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const {userPhone} = useContext(GlobalContext);
  const selectChangePassword = useAppSelector(state => state.changePassword);

  function validateInputs() {
    const tempErrors: PasswordErrors = {};

    if (password.length === 0) {
      tempErrors.password = 'Enter a valid password';
    }
    if (confirmPassword.length === 0) {
      tempErrors.confirmPassword = 'Enter a valid password';
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'password does not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function onSubmit() {
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      dispatch(onChangePassword(userPhone, password, ''));
    }
  }

  useEffect(() => {
    if (selectChangePassword.called) {
      setLoading(false);
      const {success} = selectChangePassword;
      if (success) {
        navigation.navigate('EditProfile');
        Snackbar.show({
          text: 'Password created successfully',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  }, [selectChangePassword]);

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
              Create Password
            </CustomText>
            <Box style={styles.inputContainer}>
              <Input
                label="New Password"
                value={password}
                onChangeText={setPassword}
                error={errors?.password}
                maxLength={10}
                noMargin
                secureTextEntry={showPass ? false : true}
                renderEndIcon={() => {
                  return (
                    <Pressable
                      onPress={() => setShowPass(!showPass)}
                      style={styles.eye}>
                      <Icon
                        name={showPass ? 'eye' : 'eye-off'}
                        size={18}
                        color="#111111"
                      />
                    </Pressable>
                  );
                }}
              />
              <Input
                label="Confirm new password"
                showTextButton={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={errors?.confirmPassword}
                noMargin
                secureTextEntry={showConfirmPass ? false : true}
                renderEndIcon={() => {
                  return (
                    <Pressable
                      onPress={() => setShowConfirmPass(!showConfirmPass)}
                      style={styles.eye}>
                      <Icon
                        name={showConfirmPass ? 'eye' : 'eye-off'}
                        size={18}
                        color="#111111"
                      />
                    </Pressable>
                  );
                }}
              />
            </Box>
            <Box alignSelf="center" mv={'5%'}>
              <PrimaryButton label="Submit" onPress={onSubmit} />
            </Box>
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
  eye: {
    position: 'absolute',
    right: 20,
  },
});

//name , password, city, email, sellertype : two three four
