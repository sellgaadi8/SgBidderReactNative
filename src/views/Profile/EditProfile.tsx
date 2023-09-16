/* eslint-disable react-native/no-inline-styles */
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
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
} from 'react-native';
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
import {getCityLists} from '../../redux/ducks/getCity';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../components/CustomText';
import colors from '../../utils/colors';

export default function EditProfile({navigation}: EditProfileProps) {
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [gst, setGst] = useState('');
  const [pan, setPan] = useState('');
  const [adhar, setAdhar] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cityData, setCityData] = useState<City[]>([]);
  const [modalData, setModalData] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState<EditProfileErrors>();
  const {userPhone, isFirstTime} = useContext(GlobalContext);
  const [cityId, setCityId] = useState('');
  const dispatch = useDispatch<any>();
  const selectProfileUpate = useAppSelector(state => state.updateProfile);
  const selectGetProfile = useAppSelector(state => state.getProfile);
  const selectCity = useAppSelector(state => state.getCity);

  useEffect(() => {
    dispatch(getCityLists());
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
    if (gst.length === 0) {
      tempErrors.gst = 'Enter a gst number';
    }
    if (adhar.length === 0) {
      tempErrors.adhar = 'Enter aadhar number';
    }
    if (address1.length === 0) {
      tempErrors.address1 = 'Enter Address';
    }
    if (pan.length === 0) {
      tempErrors.pan = 'Enter a pan number';
    }
    if (city.length === 0) {
      tempErrors.city = 'Select city';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function update() {
    const isValid = validateInputs();
    Keyboard.dismiss();
    if (isValid) {
      setLoading(true);
      dispatch(onUpdateProfile(name, gst, pan, adhar, email, address1, city));
    }
  }

  useEffect(() => {
    if (selectProfileUpate.called) {
      setLoading(false);
      const {success, message} = selectProfileUpate;
      if (success) {
        Snackbar.show({
          text: message,
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
        if (data.city) {
          setCityId(data.city);
        }
      }
    }
    if (selectCity.called) {
      const {error, data} = selectCity;
      if (!error && data) {
        setCityData(data);
        setModalData(data);
      }
    }
  }, [selectProfileUpate, selectGetProfile]);

  function onChangeQuery(query: string) {
    setSearchQuery(query);
    if (query) {
      const results = modalData.filter(item => {
        const itemName = item.city.toLowerCase();
        const queryLower = query.toLowerCase();
        return itemName.includes(queryLower);
      });
      setModalData(results);
    } else {
      setModalData(cityData);
    }
  }

  function onOpenModal() {
    setShowModal(true);
  }

  function onCloseModal() {
    setShowModal(false);
  }

  function onPressSelecteItem(item: City) {
    setCityId(item.id);
    setCity(item.city);
    setShowModal(false);
  }

  function renderItem({item}: ListRenderItemInfo<City>) {
    return (
      <Pressable style={{padding: 10}} onPress={() => onPressSelecteItem(item)}>
        <CustomText
          color="#000000"
          fontFamily="Roboto-Medium"
          fontSize={16}
          lineHeight={24}>
          {item.city}
        </CustomText>
      </Pressable>
    );
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

        <Input
          label="Address"
          value={address1}
          onChangeText={setAddress1}
          error={errors?.address1}
          noMargin
        />
        <Pressable onPress={onOpenModal}>
          <Input
            label="City"
            showTextButton={true}
            value={city}
            onChangeText={setCity}
            error={errors?.city}
            noMargin
            editable={false}
          />
        </Pressable>
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
          error={errors?.gst}
          noMargin
        />

        <Input
          label="Pan number"
          value={pan}
          onChangeText={setPan}
          maxLength={10}
          error={errors?.pan}
          noMargin
        />

        <Input
          label="Aadhar number"
          value={adhar}
          onChangeText={setAdhar}
          maxLength={12}
          keyboardType="numeric"
          error={errors?.adhar}
          noMargin
        />
        {/* {isFirstTime ? (
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
        ) : ( */}
        <Box width={'45%'} alignSelf="center" pv={'5%'}>
          <PrimaryButton label="Update" onPress={update} />
        </Box>
        {/* )} */}
      </ScrollView>
      <Modal
        isOpen={showModal}
        onClosed={onCloseModal}
        style={styles.modal}
        backButtonClose={true}
        backdrop={true}>
        <Box ph={'5%'}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Box
              style={{
                width: '90%',
                marginTop: 10,
              }}>
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChangeText={onChangeQuery}
              />
            </Box>
            <Pressable style={{bottom: 10}} onPress={onCloseModal}>
              <Icon name="close" size={25} color={'#000000'} />
            </Pressable>
          </Box>

          <FlatList
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            data={modalData}
            contentContainerStyle={{marginTop: -10}}
          />
        </Box>
      </Modal>
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
  modal: {
    backgroundColor: colors.White,
  },
});
