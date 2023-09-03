/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {container, contentCenter} from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions, Image, Pressable, ScrollView} from 'react-native';
import colors from '../../utils/colors';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Loader from '../../components/Loader';
import PopulateImageWithData from '../../components/PopulateImageWithData';
import Modal from 'react-native-modalbox';
import VideoPlayer from '../../components/VideoPlayer';
import {onGetVehicleDetails} from '../../redux/ducks/getVehicleDetails';
import {useAppSelector} from '../../utils/hook';
import RectButtonCustom from '../../components/RectButtonCustom';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';
import {VehicleDetailProps} from '../../types/propTypes';
import {onOCB} from '../../redux/ducks/oneClickBuy';
import Snackbar from 'react-native-snackbar';
import BidWindow from '../../components/BidWindow';
import {onPlaceVehicleBid} from '../../redux/ducks/placebid';
// import Carousel from 'react-native-snap-carousel';
// import ImageViewerCarousel from './ImageViewerCarousel';
const {height, width} = Dimensions.get('window');

export default function VehicleDetail({route, navigation}: VehicleDetailProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleDetails = useAppSelector(state => state.getVehicleDetails);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetail | null>();
  const [vehicleImage, setVehicleImage] = useState<(string | null)[]>();
  const [images, setImages] = useState<
    {index: number; key: string; value: string}[]
  >([]);
  const [play, setPlay] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [video, setVideo] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  // const [showImageModal, setShowImageModal] = useState(false);
  const [id, setId] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const [amount, setAmount] = useState('');
  const selectOcb = useAppSelector(state => state.oneClickBuy);
  const selectOnBid = useAppSelector(state => state.placebid);

  const tabs = [
    {title: 'Documents', onPress: () => onChangeTab(0)},
    {title: 'Exterior', onPress: () => onChangeTab(1)},
    {title: 'Externel panel', onPress: () => onChangeTab(2)},
    {
      title: 'Tyres',
      onPress: () => onChangeTab(3),
    },
    {title: 'Engine', onPress: () => onChangeTab(4)},
    {title: 'Electricals', onPress: () => onChangeTab(5)},
    {
      title: 'Steering',
      onPress: () => onChangeTab(6),
    },
  ];

  const [okValues, setOkValues] = useState<{
    [key: string]: string | {value: string; image: string};
  }>();
  const [exterior, setExterior] = useState<{
    [key: string]: string | {value: string; image: string};
  }>();

  const [okValuesExternel, setOkValuesExternel] = useState<{
    [key: string]: string | {value: string; image: string};
  }>();

  const [externel, setExternel] = useState<{
    [key: string]: string | {value: string; image: string};
  }>();
  const [loading, setLoading] = useState(false);
  // const [scrollIndex, setScrollIndex] = useState(0);

  function onChangeTab(index: number) {
    setActiveIndex(index);
  }

  // const translateX = useSharedValue(0);

  // useEffect(() => {
  //   translateX.value = withSpring((width / 3.5) * activeIndex);
  // }, [activeIndex, translateX]);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateX: translateX.value}],
  //   };
  // }, []);

  const calculateRemainingTime = (timeDiff: number) => {
    if (timeDiff <= 0) {
      return '00:00:00';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const targetDateString = vehicleDetails?.vehicle.auction_ends_at || ''; // Handle null or undefined target date
  const targetDate = new Date(targetDateString);
  const currentTime = new Date();

  const [remainingTime, setRemainingTime] = useState(
    targetDateString
      ? calculateRemainingTime(targetDate.getTime() - currentTime.getTime())
      : '00:00:00',
  );

  useEffect(() => {
    if (!targetDateString) {
      return;
    }

    const interval = setInterval(() => {
      const updatedNow = new Date();
      const updatedTimeDifference = targetDate.getTime() - updatedNow.getTime();
      setRemainingTime(calculateRemainingTime(updatedTimeDifference));

      if (updatedTimeDifference <= 0) {
        clearInterval(interval);
        setRemainingTime('00:00:00');
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDateString]);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetVehicleDetails(route.params.vehicleId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectVehicleDetails.called) {
      setLoading(false);
      const {data, success, error} = selectVehicleDetails;

      if (success && !error && data) {
        setVehicleDetails(data);
        if (data.car_images) {
          setVehicleImage(Object.values(data.car_images));
        }

        if (data.exterior_img) {
          setExterior(data.exterior_img);
          getExteriorData();
        }
        if (data.external_panel) {
          setExternel(data.external_panel);
          getExternelData();
        }

        const imageArray: {key: string; value: string; index: number}[] = [];

        // Initialize an index variable
        let index = 0;

        // Push image values with keys and index into the array
        for (const key in vehicleDetails) {
          const section = vehicleDetails[key];
          if (typeof section === 'object' && section !== null) {
            for (const subKey in section) {
              const subSection = section[subKey];
              if (
                typeof subSection === 'object' &&
                subSection !== null &&
                'image' in subSection &&
                !subSection.image.includes('mp4')
              ) {
                imageArray.push({key: subKey, value: subSection.image, index});
                // Increment the index for the next element
                index++;
              }
            }
          }
        }
        setImages(imageArray);
      }
    }
    if (selectOcb.called) {
      setLoading(false);
      const {success, message} = selectOcb;
      if (success) {
        Snackbar.show({
          text: message,
          backgroundColor: 'green',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.navigate('BottomNavigation');
      } else {
        Snackbar.show({
          text: message,
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    if (selectOnBid.called) {
      setLoading(false);
      const {success} = selectOnBid;
      if (success) {
        setShowBidModal(false);
        setAmount('');
        navigation.navigate('SuccessPage');
      } else {
        Snackbar.show({
          text: 'Your Bid is Lower than the last placed bid.',
          backgroundColor: 'red',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectVehicleDetails, vehicleDetails, selectOcb, selectOnBid]);

  function getExteriorData() {
    const okValue: Partial<{
      [key: string]: string | {value: string; image: string};
    }> = {};

    for (const key in exterior) {
      if (exterior && exterior.hasOwnProperty(key)) {
        if (exterior && exterior[key] === 'ok') {
          okValue[
            key as keyof {
              [key: string]: string | {value: string; image: string};
            }
          ] = exterior[key];
        }
      }
    }
    setOkValues(okValue);
  }

  function getExternelData() {
    const okValue: Partial<{
      [key: string]: string | {value: string; image: string};
    }> = {};

    for (const key in externel) {
      if (externel && externel.hasOwnProperty(key)) {
        if (externel && externel[key] === 'ok') {
          okValue[
            key as keyof {
              [key: string]: string | {value: string; image: string};
            }
          ] = externel[key];
        }
      }
    }
    setOkValuesExternel(okValue);
    console.log('ok', okValue);
  }

  function onPressImage(title: string) {
    navigation.navigate('ImageViewerCarousel', {
      data: images,
      title: title,
    });
  }

  function onClosedVideo() {
    setShowVideo(false);
  }

  function onPressVideo(value: string) {
    if (value) {
      setVideo(value);
      setShowVideo(true);
    }
  }

  // function onCloseImageModal() {
  //   setShowImageModal(false);
  // }

  function onPlaceBid(el: Vehicle) {
    if (vehicleDetails?.vehicle.vehicle_status !== 'one_click_buy') {
      setId(el.uuid);
      setShowBidModal(true);
    } else {
      setLoading(true);
      dispatch(onOCB(el.uuid));
    }
  }

  function onCloseBidModal() {
    setShowBidModal(false);
  }

  function onPlus() {
    let temp = 1000 + Number(amount);
    setAmount(temp.toString());
  }

  function onMinus() {
    if (+amount >= 0) {
      let temp = Number(amount) - 1000;
      setAmount(temp.toString());
    }
    if (+amount < 1000) {
      setAmount('0');
    }
  }

  function onAddAmount(value: string) {
    setAmount(value.toString());
  }

  function onSubmitBid() {
    if (+amount > 1000) {
      dispatch(onPlaceVehicleBid(id, amount));
    } else {
      Snackbar.show({
        text: 'Please enter a valid bid amount',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {vehicleImage &&
            vehicleImage?.map((el, index) => {
              return (
                <Box key={index.toString()}>
                  {el && el?.includes('mp4') ? (
                    <Box>
                      <Video
                        source={{uri: el}}
                        style={styles.images}
                        resizeMode="cover"
                        paused={!play}
                        repeat={true}
                        muted
                      />
                      <Pressable
                        style={styles.play}
                        onPress={() => setPlay(!play)}>
                        <Ionicons
                          name={!play ? 'play' : 'pause'}
                          color="#FFFFFF"
                          size={30}
                        />
                      </Pressable>
                    </Box>
                  ) : (
                    el && (
                      <Pressable>
                        <Image
                          source={{uri: el}}
                          style={styles.images}
                          resizeMode="cover"
                        />
                      </Pressable>
                    )
                  )}
                </Box>
              );
            })}
        </ScrollView>
        <Box pv={'5%'} ph={'6%'}>
          <CustomText
            fontSize={22}
            lineHeight={32}
            color="#111111"
            fontFamily="Roboto-Medium">
            {vehicleDetails?.display_info.make}{' '}
            {vehicleDetails?.display_info.model}
          </CustomText>
          <Box flexDirection="row">
            <CustomText
              fontSize={12}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium">
              {vehicleDetails?.display_info.variant}
            </CustomText>
            <CustomText
              fontSize={12}
              lineHeight={18}
              color="#111111"
              fontFamily="Roboto-Medium"
              style={{marginLeft: 5}}>
              ({vehicleDetails?.display_info.color})
            </CustomText>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" pv={'3%'}>
            <Box flexDirection="row">
              <MaterialCommunityIcons
                name="gas-station-outline"
                size={20}
                color={colors.primary}
                style={styles.marginRight}
              />
              <CustomText
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.fuel_type}
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
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.no_of_kms} (Km)
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
                fontSize={12}
                lineHeight={18}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.display_info.no_of_owners}
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
                Customer expected price: Rs.
                {vehicleDetails?.vehicle.auction_value}
              </CustomText>
            </Box>
            {vehicleDetails?.vehicle.vehicle_status === 'in_auction' && (
              <Box style={styles.highestbid}>
                <CustomText
                  color="#FFFFFF"
                  fontSize={16}
                  lineHeight={22}
                  fontFamily="Roboto-Medium">
                  Highest Bid: {vehicleDetails?.vehicle.highest_bid}
                </CustomText>
              </Box>
            )}
          </Box>
          <Box style={styles.tabBg}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              {tabs.map((el, idx) => {
                return (
                  <View key={idx} style={styles.tab}>
                    <RectButtonCustom
                      key={idx}
                      onPress={el.onPress}
                      style={styles.touchable}>
                      <CustomText
                        color={idx === activeIndex ? '#FFFFFF' : '#5D5D5D'}
                        fontFamily={
                          idx === activeIndex ? 'Roboto-Bold' : 'Roboto-Medium'
                        }
                        fontSize={15}>
                        {el.title}
                      </CustomText>
                    </RectButtonCustom>
                  </View>
                );
              })}
            </ScrollView>
            {/* <View style={styles.lineContainer}>
              <Animated.View style={[styles.dash, animatedStyles]} />
            </View> */}
          </Box>

          <Box style={styles.body}>
            {activeIndex === 0 && vehicleDetails?.car_docs && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Documents</CustomText>
                {Object.entries(vehicleDetails?.car_docs).map((el, index) => {
                  return (
                    <PopulateImageWithData
                      key={index.toString()}
                      title={el[0].replace(/_/g, ' ').toUpperCase()}
                      image={
                        typeof el[1] === 'object' && el[1] !== null
                          ? el[1].image
                          : ''
                      }
                      value={
                        typeof el[1] === 'object' && el[1] !== null
                          ? el[1].value
                          : el[1]
                      }
                      onPressImage={() => onPressImage(el[0])}
                    />
                  );
                })}
              </Box>
            )}

            {activeIndex === 1 && vehicleDetails?.exterior_img && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Exterior</CustomText>
                <Box pv={'3%'}>
                  <CustomText style={styles.value}>
                    {okValues &&
                      Object.keys(okValues)
                        .map(el => {
                          return el
                            .split('_')
                            .map(
                              word =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(' ');
                        })
                        .join(', ')}
                  </CustomText>

                  {Object.entries(vehicleDetails.exterior_img).map(
                    (el, index) => {
                      if (typeof el[1] === 'object') {
                        return (
                          <PopulateImageWithData
                            key={index.toString()}
                            title={el[0].replace(/_/g, ' ').toUpperCase()}
                            image={el[1] ? el[1].image : ''}
                            value={el[1] ? el[1].value : ''}
                            onPressImage={() => onPressImage(el[0])}
                          />
                        );
                      }
                    },
                  )}
                </Box>
              </Box>
            )}

            {activeIndex === 2 && vehicleDetails?.external_panel && (
              <Box>
                <CustomText style={styles.vehicleHeading}>
                  Externel Panel
                </CustomText>
                <Box pv={'3%'}>
                  <CustomText style={styles.value}>
                    {okValuesExternel &&
                      Object.keys(okValuesExternel)
                        .map(el => {
                          return el
                            .split('_')
                            .map(
                              word =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(' ');
                        })
                        .join(', ')}
                  </CustomText>
                </Box>
                {Object.entries(vehicleDetails.external_panel).map(
                  (el, index) => {
                    if (typeof el[1] === 'object') {
                      return (
                        <PopulateImageWithData
                          key={index.toString()}
                          title={el[0].replace(/_/g, ' ').toUpperCase()}
                          image={el[1] ? el[1].image : ''}
                          value={el[1] ? el[1].value : ''}
                          onPressImage={() => onPressImage(el[0])}
                        />
                      );
                    }
                  },
                )}
              </Box>
            )}
            {activeIndex === 3 && vehicleDetails?.tyres && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Tyres</CustomText>
                {Object.entries(vehicleDetails.tyres).map((el, index) => {
                  return (
                    <PopulateImageWithData
                      key={index.toString()}
                      title={el[0].replace(/_/g, ' ').toUpperCase()}
                      image={el[1] ? el[1].image : ''}
                      value={el[1] ? el[1].value : ''}
                      onPressImage={() => onPressImage(el[0])}
                    />
                  );
                })}
              </Box>
            )}
            {activeIndex === 4 && vehicleDetails?.engine && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Engine</CustomText>
                {Object.entries(vehicleDetails.engine).map((el, index) => {
                  return (
                    <PopulateImageWithData
                      key={index.toString()}
                      title={el[0].replace(/_/g, ' ').toUpperCase()}
                      image={
                        typeof el[1] === 'object' && el[1] !== null
                          ? el[1].image
                          : ''
                      }
                      value={
                        typeof el[1] === 'object' && el[1] !== null
                          ? el[1].value.replace(/_/g, ' ').toUpperCase()
                          : !el[1]?.includes('https')
                          ? el[1]
                          : ''
                      }
                      onPressImage={() => onPressImage(el[0])}
                      onPressVideo={() =>
                        onPressVideo(
                          typeof el[1] === 'object'
                            ? el[1]?.image.includes('mp4')
                              ? el[1].image
                              : ''
                            : '',
                        )
                      }
                    />
                  );
                })}
              </Box>
            )}
            {activeIndex === 5 && vehicleDetails?.electricals && (
              <Box>
                <CustomText style={styles.vehicleHeading}>
                  Electricals
                </CustomText>
                {Object.entries(vehicleDetails.electricals).map((el, index) => {
                  return (
                    <PopulateImageWithData
                      key={index.toString()}
                      title={el[0].replace(/_/g, ' ').toUpperCase()}
                      image={
                        typeof el[1] === 'object' && el[1] !== null
                          ? el[1].image
                          : ''
                      }
                      value={
                        typeof el[1] === 'object' && el[1] !== null
                          ? el[1].value
                          : el[1]
                      }
                      onPressImage={() => onPressImage(el[0])}
                    />
                  );
                })}
              </Box>
            )}
            {activeIndex === 6 && vehicleDetails?.handling_and_suspension && (
              <Box>
                <CustomText style={styles.vehicleHeading}>
                  Handling and Suspension
                </CustomText>
                {Object.entries(vehicleDetails.handling_and_suspension).map(
                  (el, index) => {
                    return (
                      <PopulateImageWithData
                        key={index.toString()}
                        title={el[0].replace(/_/g, ' ').toUpperCase()}
                        image={el[1] ? el[1].image : ''}
                        value={el[1] ? el[1].value : ''}
                        onPressImage={() => onPressImage(el[0])}
                      />
                    );
                  },
                )}
              </Box>
            )}
            {activeIndex === 6 && vehicleDetails?.steering && (
              <Box>
                <CustomText style={styles.vehicleHeading}>Steering</CustomText>
                {Object.entries(vehicleDetails.steering).map((el, index) => {
                  if (typeof el[1] !== 'object') {
                    return (
                      <Box
                        key={index.toString()}
                        flexDirection="row"
                        justifyContent="space-between"
                        pv={'3%'}
                        alignItems="center"
                        width={'90%'}>
                        <CustomText style={styles.dataValue}>
                          {el[0].replace(/_/g, ' ').toUpperCase()}
                        </CustomText>
                        <CustomText style={styles.value}>{el[1]}</CustomText>
                      </Box>
                    );
                  }
                })}
              </Box>
            )}
          </Box>
        </Box>
      </ScrollView>
      <Modal
        isOpen={showVideo}
        onClosed={onClosedVideo}
        style={styles.modal}
        position="bottom">
        <VideoPlayer video={video} onPressClose={onClosedVideo} />
      </Modal>
      <Modal
        isOpen={showBidModal}
        onClosed={onCloseBidModal}
        style={styles.bidModal}
        position="center">
        <BidWindow
          data={route.params.data}
          onClose={onCloseBidModal}
          onMinus={onMinus}
          onPlaceBid={onSubmitBid}
          onPlus={onPlus}
          value={amount}
          onChangeText={setAmount}
          onAddAmount={onAddAmount}
        />
      </Modal>
      {!route.params.isOrder && (
        <Box style={styles.bottom}>
          <Box
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center">
            {vehicleDetails?.vehicle.vehicle_status === 'in_auction' ? (
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
            ) : (
              <CustomText
                color="#33A02C"
                fontSize={14}
                lineHeight={20}
                fontFamily="Roboto-Medium">
                Closing Price - Rs.{vehicleDetails?.vehicle.auction_value}
              </CustomText>
            )}

            <Pressable
              style={styles.placebid}
              onPress={() => onPlaceBid(route.params.data)}>
              <CustomText
                fontSize={12}
                lineHeight={16}
                color="#111111"
                fontFamily="Roboto-Medium">
                {vehicleDetails?.vehicle.vehicle_status === 'one_click_buy'
                  ? 'Buy Now'
                  : ' Place bid'}
              </CustomText>
            </Pressable>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  images: {
    height: height * 0.35,
    width: width,
  },
  line: {
    backgroundColor: '#000000',
    height: '0.1rem',
    width: '100%',
    alignSelf: 'center',
    // marginBottom: '1rem',
  },
  tabel: {},
  headers: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  body: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: widthPercentageToDP('4%'),
    paddingVertical: heightPercentageToDP('2%'),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: '3%',
  },
  dataValue: {
    color: '#111111',
    fontFamily: 'Roboto-Medium',
    lineHeight: 22,
    fontSize: 15,
  },
  value: {
    fontFamily: 'Roboto-Bold',
    color: '#34A02C',
    lineHeight: 22,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  vehicleHeading: {
    color: '#B92864',
    fontFamily: 'Roboto-Bold',
    lineHeight: 20,
    fontSize: 16,
    marginTop: 15,
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
  display: {
    fontSize: 12,
    lineHeight: 18,
    color: '#111111',
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
  },
  image: {
    height: 50,
    width: 50,
  },
  marginRight: {marginRight: 5},
  modal: {
    height: 'auto',
    width: '100%',
  },
  touchable: {
    padding: '1rem',
    ...contentCenter,
  },
  tab: {
    marginRight: '1rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
    marginTop: '0.5rem',
  },
  tabBg: {
    backgroundColor: '#111111',
    marginTop: '2rem',
  },
  highestbid: {
    marginTop: '1rem',
    backgroundColor: '#34A02C',
    padding: '0.2rem',
    paddingLeft: '1.5rem',
  },
  customerexpected: {
    marginTop: '1.5rem',
    backgroundColor: colors.secondaryLight,
    padding: '0.2rem',
    paddingLeft: '1.5rem',
  },
  bottom: {
    padding: '2.5rem',
    backgroundColor: '#EAEAEA',
  },
  dash: {
    width: width / 3,
    backgroundColor: colors.secondary,
    height: 3,
  },
  placebid: {
    padding: '0.5rem',
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: 100,
    ...contentCenter,
  },
  bidModal: {
    height: 'auto',
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
    borderRadius: 8,
  },
  time: {
    padding: '0.6rem',
    ...contentCenter,
    flexDirection: 'row',
  },
});
