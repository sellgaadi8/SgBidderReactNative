/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {container, contentCenter} from '../../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {showAlert} from '../../utils/helper';
import {onLogout} from '../../redux/ducks/logout';
import Loader from '../../components/Loader';
import Snackbar from 'react-native-snackbar';
import GlobalContext from '../../contexts/GlobalContext';
import {deleteUserToken, saveTokenValidity} from '../../utils/localStorage';
import Globals from '../../utils/globals';
import {useAppSelector} from '../../utils/hook';
import {onGetProfile} from '../../redux/ducks/getProfile';
import {ProfileProps} from '../../types/propTypes';

const Button = [
  {name: 'Personal details', detail: 'Edit & review personal details'},
  {name: 'Company details', detail: ''},
  {name: 'Support', detail: ''},
];

export default function Profile({navigation}: ProfileProps) {
  const dispatch = useDispatch<any>();
  const selectGetProfile = useAppSelector(state => state.getProfile);
  const [profileDetail, setProfleDetail] = useState<Profile>();
  const [loading, setLoading] = useState(false);
  const selectLogout = useAppSelector(state => state.logout);
  const {setAuthenticated} = useContext(GlobalContext);

  function details(index: number) {
    switch (index) {
      case 0:
        return navigation.navigate('EditProfile', {
          title: profileDetail?.dealership_name,
        });
      default:
        break;
    }
  }
  useEffect(() => {
    dispatch(onGetProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectGetProfile.called) {
      const {data, success} = selectGetProfile;
      if (success && data) {
        setProfleDetail(data);
      }
    }
    if (selectLogout.called) {
      setLoading(false);
      const {success, message} = selectLogout;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        setAuthenticated(false);
        deleteUserToken();
        Globals.instance().setTokenValidity(-1);
        saveTokenValidity(-1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectGetProfile, selectLogout]);

  function onLogoutClick() {
    showAlert(
      'Are you sure you want to logout?',
      () => {
        setLoading(true);
        dispatch(onLogout());
      },
      undefined,
    );
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <Box style={styles.profilehead}>
        <View style={styles.profile}>
          <Icon name="person" size={30} color="#EFC24F" />
        </View>
        <Box ph={'12%'}>
          <CustomText
            color="#201A1B"
            fontSize={24}
            lineHeight={32}
            fontFamily="Roboto-Regular">
            {profileDetail?.dealership_name}
          </CustomText>
          <CustomText
            color="#201A1B"
            fontSize={14}
            lineHeight={20}
            fontFamily="Roboto-Regular">
            {profileDetail?.mobile}
          </CustomText>
        </Box>
      </Box>
      <Box style={styles.body}>
        {Button.map((el, index) => {
          return (
            <Pressable
              onPress={() => details(index)}
              key={index.toString()}
              style={[
                styles.button,
                {
                  padding: 15,
                  paddingHorizontal: 20,
                },
              ]}>
              <Icon name="person-outline" size={20} color="#49454F" />
              <Box ph={'6%'}>
                <CustomText
                  color="#1C1B1F"
                  fontFamily="Roboto-Regular"
                  fontSize={16}
                  lineHeight={24}>
                  {el.name}
                </CustomText>
                {el.detail.length !== 0 && (
                  <CustomText
                    fontFamily="Roboto-Regular"
                    fontSize={14}
                    lineHeight={20}
                    color="#49454F">
                    {el.detail}
                  </CustomText>
                )}
              </Box>
            </Pressable>
          );
        })}
      </Box>
      <Pressable style={styles.logout} onPress={onLogoutClick}>
        <CustomText
          color="#FF0000"
          fontSize={14}
          lineHeight={20}
          fontFamily="Roboto-Regular">
          Log out
        </CustomText>
      </Pressable>
      <Box alignSelf="center">
        <CustomText
          fontSize={12}
          lineHeight={24}
          color="#1C1B1F"
          fontFamily="Roboto-Medium">
          Version 1.0
        </CustomText>
      </Box>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  profile: {
    backgroundColor: '#FBF3D8',
    borderRadius: 25,
    height: 48,
    width: 48,
    ...contentCenter,
    top: 5,
  },
  profilehead: {
    flexDirection: 'row',
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('3%'),
  },
  button: {
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#7F747C',
    borderBottomWidth: 1,
  },
  body: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('4%'),
  },
  logout: {
    alignSelf: 'center',
    borderWidth: 1,
    padding: '0.7rem',
    paddingHorizontal: '2rem',
    borderRadius: '2.5rem',
    borderColor: '#FF0000',
    marginTop: '2rem',
  },
});
