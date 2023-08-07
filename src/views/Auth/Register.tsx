/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItemInfo,
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
import Input from '../../components/Input';
import EStyleSheet from 'react-native-extended-stylesheet';
import PrimaryButton from '../../components/PrimaryButton';
import TextButton from '../../components/TextButton';
import {useDispatch} from 'react-redux';
// import Snackbar from 'react-native-snackbar';
import Loader from '../../components/Loader';
import {onRegister} from '../../redux/ducks/register';
import Snackbar from 'react-native-snackbar';
import Modal from 'react-native-modalbox';
import {Picker} from '@react-native-picker/picker';
import {isEmailValid, isNameValid} from '../../utils/regex';
import {useAppSelector} from '../../utils/hook';
import {getCityList} from '../../redux/ducks/getCity';
const ValuatorType = [
  {label: 'Select Vehicle Type', value: ''},
  {label: 'Four Wheeler', value: 'four_wheeler'},
  {label: 'Three Wheeler', value: 'three_wheeler'},
  {label: 'Two Wheeler', value: 'two_wheeler'},
];

export default function Register({navigation}: RegisterProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [sellerType, setSellerType] = useState('');

  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState<City[]>([]);
  const [modalData, setModalData] = useState<City[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [cityId, setCityId] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>();
  const selectRegister = useAppSelector(state => state.register);
  const selectCity = useAppSelector(state => state.getCity);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch<any>();

  useEffect(() => {
    // dispatch(getCityList());
  }, []);

  function onSubmit() {
    Keyboard.dismiss();
    const isValid = validateInputs();
    if (isValid) {
      setLoading(true);
      dispatch(onRegister(name, phone, cityId, email, sellerType));
    }
  }

  function validateInputs() {
    const tempErrors: RegisterErrors = {};

    if (name.length < 3) {
      tempErrors.name = 'Enter a valid full name';
    } else if (!isNameValid(name)) {
      tempErrors.name = 'Enter a valid full name';
    }
    if (!isEmailValid(email)) {
      tempErrors.email = 'Enter a valid email address';
    }
    if (phone.length < 10) {
      tempErrors.phone = 'Enter a valid phone';
    }
    if (city.length === 0) {
      tempErrors.city = 'Select city';
    }
    if (sellerType.length === 0) {
      tempErrors.sellerType = 'Select seller type';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  useEffect(() => {
    if (selectRegister.called) {
      setLoading(false);
      navigation.navigate('Login');
      const {message, success} = selectRegister;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectCity.called) {
      const {error, data} = selectCity;
      if (!error && data) {
        setCityData(data);
        setModalData(data);
      }
    }
  }, [selectRegister]);

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
        <CustomText color="#111111">{item.city}</CustomText>
      </Pressable>
    );
  }

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
                label="Name"
                value={name}
                onChangeText={setName}
                error={errors?.name}
                noMargin
              />
              <Input
                label="Email"
                showTextButton={true}
                value={email}
                onChangeText={setEmail}
                error={errors?.email}
                noMargin
              />
              <Input
                label="Phone"
                showTextButton={true}
                value={phone}
                onChangeText={setPhone}
                error={errors?.phone}
                noMargin
                maxLength={10}
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
              <Box
                style={[
                  styles.pickerContainer,
                  {
                    borderColor: !errors ? '#ACACAC' : '#FF0000',
                  },
                ]}>
                <Picker
                  style={styles.picker}
                  onValueChange={setSellerType}
                  selectedValue={sellerType}
                  placeholder="Select Vehicle Type">
                  {/* <Picker.Item value="" label="Select" /> */}
                  {ValuatorType.map((el, index) => {
                    return (
                      <Picker.Item
                        style={{color: '#000000', fontSize: 12}}
                        key={index}
                        label={el.label}
                        value={el.value}
                      />
                    );
                  })}
                </Picker>
              </Box>
              {errors && (
                <CustomText fontSize={12} color="#FF0000">
                  {errors.sellerType}
                </CustomText>
              )}
            </Box>
            <Box width={'40%'} alignSelf="center" mv={'5%'} flexDirection="row">
              <PrimaryButton label="Submit" onPress={onSubmit} />
            </Box>
            <Box flexDirection="row" justifyContent="center">
              <CustomText
                color="#111111"
                fontFamily="Roboto-Regular"
                fontSize={14}
                lineHeight={22}>
                Already Have Accout?{'  '}
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
      <Modal
        isOpen={showModal}
        onClosed={onCloseModal}
        style={styles.modal}
        backButtonClose={true}
        backdrop={true}>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChangeText={onChangeQuery}
        />
        <FlatList
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          data={modalData}
        />
      </Modal>
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
    width: pixelSizeHorizontal(380),
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
  picker: {width: '100%', color: '#FFFFFF', fontSize: 12},
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ACACAC',
  },
});

//name , phone, city, email, sellertype : two three four
