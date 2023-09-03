/* eslint-disable react-hooks/exhaustive-deps */

import React, {useContext, useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {container} from '../../utils/styles';
import Box from '../../components/Box';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import {Keyboard, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import Snackbar from 'react-native-snackbar';
import Input from '../../components/Input';
import GlobalContext from '../../contexts/GlobalContext';
import {onUpdateProfile} from '../../redux/ducks/updateProfile';
import {useAppSelector} from '../../utils/hook';
import {isEmailValid, isNameValid} from '../../utils/regex';
import {EditProfileProps} from '../../types/propTypes';
import {onGetProfile} from '../../redux/ducks/getProfile';

export default function EditProfile({navigation}: EditProfileProps) {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [adhar, setAdhar] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<EditProfileErrors>();
  const {userPhone, isFirstTime} = useContext(GlobalContext);
  const dispatch = useDispatch<any>();
  const selectProfileUpate = useAppSelector(state => state.updateProfile);
  const selectGetProfile = useAppSelector(state => state.getProfile);

  useEffect(() => {
    dispatch(onGetProfile());
    setPhone(userPhone);
  }, []);

  function validateInputs() {
    const tempErrors: EditProfileErrors = {};

    if (name.length < 3) {
      tempErrors.name = 'Enter a valid full name';
    } else if (!isNameValid(name)) {
      tempErrors.name = 'Enter a valid full name';
    }
    if (!isEmailValid(email)) {
      tempErrors.email = 'Enter a valid email address';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function update() {
    const isValid = validateInputs();
    Keyboard.dismiss();
    if (isValid) {
      setLoading(true);
      dispatch(onUpdateProfile(name, gst, pan, adhar, email, address1));
    }
  }

  useEffect(() => {
    if (selectProfileUpate.called) {
      setLoading(false);
      const {success} = selectProfileUpate;
      if (success) {
        Snackbar.show({
          text: 'Details Added Succesfully',
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        if (isFirstTime) {
          navigation.navigate('ExploreStack');
        } else {
          navigation.navigate('ProfileStack');
        }
      }
    }
    if (selectGetProfile.called) {
      const {data, success} = selectGetProfile;
      if (success && data) {
        if (data.dealership_name) {
          setName(data.dealership_name);
        }
        setPhone(data.mobile);
        if (data.email) {
          setEmail(data.email);
        }
        if (data.dealership_address) {
          setAddress1(data.dealership_address);
        }
        if (data.gst_no) {
          setGst(data.gst_no);
        }
        if (data.aadhar_no) {
          setAdhar(data.aadhar_no);
        }
        if (data.business_pan) {
          setPan(data.business_pan);
        }
      }
    }
  }, [selectProfileUpate, selectGetProfile]);

  function onSkip() {
    navigation.navigate('ExploreStack');
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader status="Loading..." />}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.onScroll}>
        <Input
          label="Name*"
          value={name}
          onChangeText={setName}
          error={errors?.name}
          noMargin
        />

        <Input label="Address" value={address1} onChangeText={setAddress1} />

        <Input
          label="Mobile*"
          value={phone}
          onChangeText={setPhone}
          editable={false}
        />

        <Input
          label="Email*"
          value={email}
          onChangeText={setEmail}
          error={errors?.email}
          noMargin
        />

        <Input
          label="GST number"
          value={gst}
          onChangeText={setGst}
          maxLength={15}
        />

        <Input
          label="Pan number"
          value={pan}
          onChangeText={setPan}
          maxLength={10}
        />

        <Input
          label="Aadhar number"
          value={adhar}
          onChangeText={setAdhar}
          maxLength={12}
          keyboardType="numeric"
        />
        {isFirstTime ? (
          <Box style={[styles.buttonContainer]}>
            <Box width={'45%'}>
              <PrimaryButton label="Update" onPress={update} />
            </Box>

            <Box width={'45%'} ph={'1%'}>
              <PrimaryButton
                label="Skip"
                onPress={onSkip}
                varient="Secondary"
              />
            </Box>
          </Box>
        ) : (
          <Box width={'45%'} alignSelf="center" pv={'5%'}>
            <PrimaryButton label="Update" onPress={update} />
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  onScroll: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
  },
  button: {
    marginBottom: '4rem',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4rem',
    marginTop: '2rem',
  },
});
