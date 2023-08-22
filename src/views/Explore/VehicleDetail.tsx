/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import Box from '../../components/Box';
import CustomText from '../../components/CustomText';
import {container} from '../../utils/styles';
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
// import PopulateImageWithData from '../../components/PopulateImageWithData';
// import DataWithImages from '../../components/DataWithImages';
import Loader from '../../components/Loader';
import PopulateImageWithData from '../../components/PopulateImageWithData';
import Modal from 'react-native-modalbox';
import VideoPlayer from '../../components/VideoPlayer';
import {onGetVehicleDetails} from '../../redux/ducks/getVehicleDetails';
import {useAppSelector} from '../../utils/hook';
// import {Animated} from 'react-native';
// import Indicator from '../../components/Indicator';
const {height, width} = Dimensions.get('window');
const types = [
  'Documents',
  'Exterior',
  'Externel panel',
  'Tyres',
  'Engine',
  'Electricals',
  'Steering',
];
// const max_height = 460;
// const min_height = 0;
// const HEADER_SCROLL_DISTANCE = max_height - min_height;

export default function VehicleDetail({route, navigation}: VehicleDetailProps) {
  const dispatch = useDispatch<any>();
  const selectVehicleDetails = useAppSelector(state => state.getVehicleDetails);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetail | null>();
  const [vehicleImage, setVehicleImage] = useState<(string | null)[]>();
  const [images, setImages] = useState<{key: string; value: string}[]>([]);
  const [play, setPlay] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [video, setVideo] = useState('');
  // const scrollY = new Animated.Value(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, HEADER_SCROLL_DISTANCE],
  //   outputRange: [max_height, min_height],
  //   extrapolate: 'clamp',
  // });

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

        const imageArray: {key: string; value: string}[] = [];

        // Push image values with keys into the array
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
                imageArray.push({key: subKey, value: subSection.image});
              }
            }
          }
        }
        setImages(imageArray);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectVehicleDetails, vehicleDetails]);

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

  // function handleOnScroll(event: any) {
  //   var abc =
  //     event.nativeEvent.contentOffset.x / Dimensions.get('window').width;
  //   setScrollIndex(Math.round(abc));
  // }

  function onPressImage(index: number) {
    navigation.navigate('ImageViewerCarousel', {
      data: images,
      index: index,
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

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <ScrollView>
        <View>
          <ScrollView
            horizontal={true}
            // onScroll={handleOnScroll}
            showsHorizontalScrollIndicator={false}>
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
                        <Image
                          source={{uri: el}}
                          style={styles.images}
                          resizeMode="cover"
                        />
                      )
                    )}
                  </Box>
                );
              })}
          </ScrollView>
          {/* {vehicleImage && (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                position: 'absolute',
                padding: 10,
                right: 10,
                bottom: 180,
              }}>
              <Indicator index={scrollIndex} length={vehicleImage.length} />
            </View>
          )} */}
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
                fontSize={11}
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
          </Box>
        </View>
        <ScrollView horizontal>
          {types.map((el, index) => {
            return (
              <Pressable key={index.toString()} style={styles.headers}>
                <CustomText
                  color="White"
                  fontFamily="Roboto-Regular"
                  fontSize={16}
                  lineHeight={22}>
                  {el}
                </CustomText>
              </Pressable>
            );
          })}
        </ScrollView>
        {/* <ScrollView
      // scrollEventThrottle={16}
      // onScroll={Animated.event(
      //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
      //   {useNativeDriver: false, listener: handleOnScroll},
      // )}
      > */}
        <Box style={styles.body}>
          {vehicleDetails?.car_docs && (
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
                    onPressImage={() => onPressImage(index)}
                  />
                );
              })}
            </Box>
          )}

          {vehicleDetails?.exterior_img && (
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
                          onPressImage={() => onPressImage(index)}
                        />
                      );
                    }
                  },
                )}
              </Box>
            </Box>
          )}

          {vehicleDetails?.external_panel && (
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
                        onPressImage={() => onPressImage(index)}
                      />
                    );
                  }
                },
              )}
            </Box>
          )}
          {vehicleDetails?.tyres && (
            <Box>
              <CustomText style={styles.vehicleHeading}>Tyres</CustomText>
              {Object.entries(vehicleDetails.tyres).map((el, index) => {
                return (
                  <PopulateImageWithData
                    key={index.toString()}
                    title={el[0].replace(/_/g, ' ').toUpperCase()}
                    image={el[1] ? el[1].image : ''}
                    value={el[1] ? el[1].value : ''}
                    onPressImage={() => onPressImage(index)}
                  />
                );
              })}
            </Box>
          )}
          {vehicleDetails?.engine && (
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
                    onPressImage={() => onPressImage(index)}
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
          {vehicleDetails?.electricals && (
            <Box>
              <CustomText style={styles.vehicleHeading}>Electricals</CustomText>
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
                    onPressImage={() => onPressImage(index)}
                  />
                );
              })}
            </Box>
          )}
          {vehicleDetails?.handling_and_suspension && (
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
                      onPressImage={() => onPressImage(index)}
                    />
                  );
                },
              )}
            </Box>
          )}
          {vehicleDetails?.steering && (
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
      </ScrollView>
      <Modal
        isOpen={showVideo}
        onClosed={onClosedVideo}
        style={styles.modal}
        position="bottom">
        <VideoPlayer video={video} onPressClose={onClosedVideo} />
      </Modal>
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    ...container,
  },
  images: {
    height: height * 0.38,
    width: width,
  },
  line: {
    backgroundColor: '#000000',
    height: '0.1rem',
    width: '100%',
    alignSelf: 'center',
    marginBottom: '1rem',
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
});
