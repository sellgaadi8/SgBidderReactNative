import {Image, KeyboardAvoidingView, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
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
// import {useDispatch} from 'react-redux';
// import Snackbar from 'react-native-snackbar';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CreatePassword({navigation}: CreatePasswordProps) {
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>();
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState('');
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function validateInputs() {
    const tempErrors: RegisterErrors = {};

    if (phone.length < 10) {
      tempErrors.phone = 'Enter a valid phone';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function onSubmit() {
    // navigation.navigate('')
  }

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
                value={phone}
                onChangeText={setPhone}
                error={errors?.phone}
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
                value={otp}
                onChangeText={setOtp}
                error={errors?.otp}
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

//name , phone, city, email, sellertype : two three four
