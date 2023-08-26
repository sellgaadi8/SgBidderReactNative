import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Box from '../../components/Box';
import colors from '../../utils/colors';
import RectButtonCustom from '../../components/RectButtonCustom';
import CustomText from '../../components/CustomText';
import {contentCenter} from '../../utils/styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useAppSelector} from '../../utils/hook';
import {useDispatch} from 'react-redux';
import {onGetVehicleList} from '../../redux/ducks/vehicleList';
import Loader from '../../components/Loader';
import VehicleCard from '../../components/VehicleCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';
const {width} = Dimensions.get('screen');

export default function Orders({navigation}: OrdersProps) {
  const tabs = [
    {title: 'Auction won', onPress: () => onChangeTab(0, 'in_negotiation')},
    {title: 'Deal Won', onPress: () => onChangeTab(1, 'deal_won')},
    {title: 'Payment done', onPress: () => onChangeTab(2, 'payment_done')},
    {
      title: 'Out for delivery',
      onPress: () => onChangeTab(3, 'out_for_delivery'),
    },
    {title: 'Delivered', onPress: () => onChangeTab(4, 'delivered')},
    {title: 'RC transfered', onPress: () => onChangeTab(5, 'rc_transfered')},
    {
      title: 'Deposit refunded',
      onPress: () => onChangeTab(6, 'deposit_refunded'),
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch<any>();
  const selectVehicleList = useAppSelector(state => state.vechicleList);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetVehicleList('in_negotiation', '', ''));
  }, []);

  function onChangeTab(index: number, status: string) {
    setActiveIndex(index);
    setLoading(true);
    dispatch(onGetVehicleList(status, '', ''));
  }
  // const translateX = useSharedValue(0);

  // useEffect(() => {
  //   translateX.value = withSpring((width / 4) * activeIndex);
  // }, [activeIndex, translateX]);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateX: translateX.value}],
  //   };
  // }, []);

  useEffect(() => {
    if (selectVehicleList.called) {
      setLoading(false);
      const {data, error} = selectVehicleList;
      if (!error && data) {
        setVehicleData(data);
        console.log('data', JSON.stringify(data));
      }
    }
  }, [selectVehicleList]);

  function renderItem({item}: ListRenderItemInfo<Vehicle>) {
    return (
      <VehicleCard
        data={item}
        onPressView={() =>
          navigation.navigate('VehicleDetail', {
            title: item.model,
            vehicleId: item.uuid,
            auctionValue: item.auction_value
              ? item.auction_value
              : item.ocb_value,
          })
        }
        isOrder={false}
      />
    );
  }

  return (
    <Box style={styles.container}>
      {loading && <Loader />}
      <Box style={styles.header}>
        <Box alignItems="center" pv={'5%'}>
          <CustomText
            fontSize={22}
            lineHeight={28}
            fontFamily="Roboto-Bold"
            color="#FFFFFF">
            Orders
          </CustomText>
        </Box>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          {/* <View style={styles.lineContainer}>
            <Animated.View style={[styles.line, animatedStyles]} />
          </View> */}
        </ScrollView>
      </Box>
      {vehicleData?.length !== 0 ? (
        <>
          <Box style={styles.flat}>
            <FlatList
              data={vehicleData}
              renderItem={renderItem}
              contentContainerStyle={styles.flatList}
            />
          </Box>
        </>
      ) : (
        <Box style={styles.noData}>
          <CustomText
            fontFamily="Roboto-Medium"
            color="#111111"
            fontSize={20}
            lineHeight={28}>
            No Vehicle Found
          </CustomText>
          <Icon name="car-off" size={35} color="#111111" />
        </Box>
      )}
    </Box>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  input: {
    borderColor: '#FFFFFF',
  },

  header: {
    backgroundColor: colors.primary,
  },
  tab: {
    marginRight: '1rem',
    marginLeft: '1rem',
    marginBottom: '1rem',
  },
  touchable: {
    padding: '1rem',
    ...contentCenter,
  },
  inputContainer: {
    padding: 15,
    top: 10,
    width: '80%',
  },
  bell: {
    right: 25,
  },
  search: {
    position: 'absolute',
    right: 20,
  },
  lineContainer: {
    width: '50%',
    position: 'absolute',
    // ...contentCenter,
    bottom: 0,
  },
  line: {
    width: width / 4,
    backgroundColor: colors.secondary,
    height: 3,
  },
  flat: {
    marginBottom: '20rem',
  },
  flatList: {
    padding: '2rem',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
