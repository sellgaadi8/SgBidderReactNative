/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import Box from './Box';
import colors from '../utils/colors';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import CustomText from './CustomText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import {contentCenter} from '../utils/styles';
import PrimaryButton from './PrimaryButton';
const {height, width} = Dimensions.get('window');

export default function BidWindow(props: BidWindowProps & TextInputProps) {
  const {data, onPlaceBid, onPlus, onMinus, onClose, amounts, onAddAmount} =
    props;
  return (
    <Box>
      <KeyboardAvoidingView>
        <ScrollView keyboardShouldPersistTaps="handled">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.images ? (
              data.images.map((el, index) => {
                return (
                  <Box key={index.toString()}>
                    {index === 0 && el !== '' ? (
                      <Video
                        source={{uri: el}}
                        style={styles.image}
                        resizeMode="cover"
                        paused={false}
                        muted
                      />
                    ) : el !== '' ? (
                      <FastImage
                        source={{
                          uri: el,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    ) : null}
                  </Box>
                );
              })
            ) : (
              <Image
                source={require('../assets/NoImage.png')}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </ScrollView>
          <Pressable style={styles.close} onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color="#111111"
            />
          </Pressable>
          <Box style={styles.body}>
            <Box ph={'3%'}>
              <CustomText
                fontSize={22}
                lineHeight={32}
                color="#111111"
                fontFamily="Roboto-Medium">
                {data.make} {data.model}
              </CustomText>
              <Box flexDirection="row">
                <CustomText
                  fontSize={14}
                  lineHeight={18}
                  color="#111111"
                  fontFamily="Roboto-Medium">
                  {data.variant}
                </CustomText>
                <CustomText
                  fontSize={14}
                  lineHeight={18}
                  color="#111111"
                  fontFamily="Roboto-Medium"
                  style={{marginLeft: 5}}>
                  ({data.color})
                </CustomText>
              </Box>
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              pv={'3%'}
              ph={'3%'}>
              <Box flexDirection="row">
                <MaterialCommunityIcons
                  name="gas-station-outline"
                  size={20}
                  color={colors.primary}
                  style={styles.marginRight}
                />
                <CustomText
                  fontSize={14}
                  lineHeight={18}
                  color="#111111"
                  fontFamily="Roboto-Medium">
                  {data.fuel_type}
                </CustomText>
              </Box>
              <Box flexDirection="row">
                <Ionicons
                  name="car-outline"
                  size={20}
                  color={colors.primary}
                  style={styles.marginRight}
                />
                <CustomText
                  fontSize={14}
                  lineHeight={18}
                  color="#111111"
                  fontFamily="Roboto-Medium">
                  {data.no_of_kms} (Km)
                </CustomText>
              </Box>
              <Box flexDirection="row">
                <Ionicons
                  name="people-outline"
                  size={20}
                  color={colors.primary}
                  style={styles.marginRight}
                />
                <CustomText
                  fontSize={14}
                  lineHeight={18}
                  color="#111111"
                  fontFamily="Roboto-Medium">
                  {data.no_of_owners}
                </CustomText>
              </Box>
            </Box>
            <View style={styles.line} />

            <Box>
              <Box style={styles.customerexpected}>
                <CustomText
                  color="#111111"
                  fontSize={14}
                  lineHeight={22}
                  fontFamily="Roboto-Medium">
                  Customer expected price: Rs.{data.auction_value}
                </CustomText>
              </Box>
              <Box style={styles.highestbid}>
                <CustomText
                  color="#FFFFFF"
                  fontSize={16}
                  lineHeight={22}
                  fontFamily="Roboto-Medium">
                  Highest Bid: Rs.10,00,000
                </CustomText>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              alignItems="center"
              pv={'2%'}
              justifyContent="space-between">
              {data.vehicle_status === 'one_click_buy' &&
                data.ocb_value &&
                data.ocb_value.length !== 0 && (
                  <Box ph={'3%'}>
                    <CustomText
                      color="#33A02C"
                      fontSize={13}
                      lineHeight={24}
                      fontFamily="Roboto-Medium">
                      Closing Price: Rs.{data.ocb_value}
                    </CustomText>
                  </Box>
                )}
            </Box>
            <Box>
              <CustomText
                color="#201A1B"
                fontSize={20}
                lineHeight={32}
                fontFamily="Roboto-Medium"
                style={{textAlign: 'center'}}>
                Place Bid
              </CustomText>
              <TextInput
                style={styles.input}
                textAlign={'center'}
                keyboardType="numeric"
                maxLength={8}
                {...props}
              />
              <Pressable style={styles.plus} onPress={onPlus}>
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  color="#111111"
                  size={20}
                />
              </Pressable>
              <Pressable style={styles.minus} onPress={onMinus}>
                <MaterialCommunityIcons
                  name="minus-circle-outline"
                  color="#111111"
                  size={20}
                />
              </Pressable>
            </Box>
            <Box flexDirection="row" justifyContent="space-around" pv={'2%'}>
              {amounts.map((el, index) => {
                return (
                  <Pressable
                    key={index.toString()}
                    style={styles.numberButton}
                    onPress={() => onAddAmount(el.value)}>
                    <CustomText>{el.label}</CustomText>
                  </Pressable>
                );
              })}
            </Box>

            <Box pv={'5%'} alignItems="center">
              <PrimaryButton label="Place bid" onPress={onPlaceBid} />
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
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  line: {
    backgroundColor: '#ACACAC',
    height: '0.18rem',
    width: '95%',
    alignSelf: 'center',
    marginBottom: '1rem',
    top: 5,
  },
  marginRight: {marginRight: 5},
  body: {
    backgroundColor: '#F6F6F6',
    padding: '1rem',
    borderBottomLeftRadius: '1.2rem',
    borderBottomRightRadius: '1.2rem',
  },
  imageContainer: {
    borderTopRightRadius: '1.2rem',
    borderTopLeftRadius: '1.2rem',
    height: height * 0.2,
    width: '100%',
  },
  image: {
    height: height * 0.24,
    width: width * 0.9,
    borderTopRightRadius: '1.2rem',
    borderTopLeftRadius: '1.2rem',
    marginRight: 5,
  },
  statusContain: {
    padding: '0.8rem',
    backgroundColor: colors.secondary,
    borderRadius: 15,
    // width: 80,
    ...contentCenter,
    elevation: 2,
  },
  view: {
    padding: '0.5rem',
    backgroundColor: 'rgba(239, 194, 79, 0.12)',
    borderRadius: 15,
    width: 80,
    ...contentCenter,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
  },
  placebid: {
    padding: '0.5rem',
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: 70,
    marginLeft: '1.5rem',
    ...contentCenter,
  },
  play: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    padding: '0.6rem',
    marginBottom: '1rem',
    // backgroundColor: '#ECECEC',
    ...contentCenter,
    left: 15,
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 20,
    // elevation: 1,
    top: 5,
    flexDirection: 'row',
  },
  highestbid: {
    marginTop: '1rem',
    marginLeft: '1rem',
    backgroundColor: '#34A02C',
    padding: '0.2rem',
    paddingLeft: '1.5rem',
  },
  customerexpected: {
    marginTop: '1.5rem',
    marginLeft: '1rem',
    backgroundColor: colors.secondaryLight,
    padding: '0.2rem',
    paddingLeft: '1.5rem',
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: '1rem',
    marginLeft: 'auto',
  },
  totalPrice: {
    marginLeft: '1rem',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: '2rem',
    marginTop: '1rem',
  },
  plus: {
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
  minus: {
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  numberButton: {
    padding: '0.3rem',
    backgroundColor: 'rgba(239, 194, 79, 0.12)',
    borderRadius: 15,
    width: 80,
    ...contentCenter,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
    top: 10,
  },
});
