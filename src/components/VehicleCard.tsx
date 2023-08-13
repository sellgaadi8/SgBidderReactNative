/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Box from './Box';
import CustomText from './CustomText';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import {contentCenter} from '../utils/styles';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {height, width} = Dimensions.get('window');

export default function VehicleCard({
  data,
  onPressEdit,
  onPressView,
}: VehicleCardProps) {
  const targetDate = new Date(data.auction_ends_at);
  const now = new Date();
  const timeDifference = targetDate.getTime() - now.getTime();

  const calculateRemainingTime = (timeDiff: number) => {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(timeDifference),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedNow = new Date();
      const updatedTimeDifference = targetDate.getTime() - updatedNow.getTime();
      setRemainingTime(calculateRemainingTime(updatedTimeDifference));

      if (updatedTimeDifference <= 0) {
        clearInterval(interval);
        setRemainingTime('00:00:00');
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Box style={styles.container}>
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

        {data.vehicle_status !== 'one_click_buy' && (
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
        )}

        <Box
          flexDirection="row"
          alignItems="center"
          pv={'5%'}
          justifyContent="space-between">
          {data.vehicle_status === 'in_auction' && (
            <Box style={styles.time}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color="#FF0000"
                style={{marginRight: 5}}
              />
              <CustomText
                color="#FF0000"
                fontSize={16}
                lineHeight={24}
                fontFamily="Roboto-Medium">
                {remainingTime}
              </CustomText>
            </Box>
          )}

          {data.vehicle_status === 'one_click_buy' &&
            data.ocb_value.length !== 0 && (
              <Box ph={'3%'}>
                <CustomText
                  color="#34A02C"
                  fontSize={13}
                  lineHeight={24}
                  fontFamily="Roboto-Medium">
                  Closing Price: Rs.{data.ocb_value}
                </CustomText>
              </Box>
            )}
          <Box flexDirection="row" ph={'1%'}>
            <Pressable style={styles.view} onPress={onPressView}>
              <CustomText
                fontSize={10}
                lineHeight={16}
                color="#111111"
                fontFamily="Roboto-Medium">
                View Details
              </CustomText>
            </Pressable>
            <Pressable style={styles.placebid} onPress={onPressEdit}>
              <CustomText
                fontSize={10}
                lineHeight={16}
                color="#111111"
                fontFamily="Roboto-Medium">
                {data.vehicle_status === 'one_click_buy'
                  ? 'Buy Now'
                  : ' Place bid'}
              </CustomText>
            </Pressable>
          </Box>
        </Box>
      </Box>
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
    height: height * 0.3,
    width: width * 0.89,
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
    backgroundColor: colors.secondaryLight,
    borderRadius: 15,
    width: 70,
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
    width: '75%',
  },
  customerexpected: {
    marginTop: '1.5rem',
    marginLeft: '1rem',
    backgroundColor: colors.secondaryLight,
    padding: '0.2rem',
    paddingLeft: '1.5rem',
  },
});
